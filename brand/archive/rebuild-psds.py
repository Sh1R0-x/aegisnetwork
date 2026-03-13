# -*- coding: utf-8 -*-
"""
AEGIS NETWORK — PSD Reconstruction Script
==========================================
Rebuilds all PSD files with:
  - Complete text content (rendered via Pillow with Inter font + tracking)
  - Properly decomposed layers (each element on its own layer)
  - RLE (packbits) compression for much smaller files
  - 300 DPI metadata
  - Named layers matching the validated brand baseline

Reference: brand baseline validated 2025-03-13
  - Wordmark tracking: 0.06em + word-spacing 0.2em
  - Baseline tracking: 0.25em
  - Colors: Optical Blue #3B82F6, Deep BG #020617, Accent Violet #7C3AED

Dependencies: Pillow, NumPy (already installed)
"""

import struct
import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

# ─── Config ──────────────────────────────────────────────────────────
SRC = r"C:\Users\Ludovic\Documents\AEGIS NETWORK"
OUT = r"C:\Users\Ludovic\Documents\AEGIS_NETWORK_DESIGNER"
PSD_LOGOS = os.path.join(OUT, "01_PSD_EDITABLE", "logos")
PSD_DOCS = os.path.join(OUT, "01_PSD_EDITABLE", "documents")

FONT_DIR = r"C:\Users\Ludovic\AppData\Local\Microsoft\Windows\Fonts"

# Brand colors
COL = {
    "optical_blue": (59, 130, 246),
    "aegis_blue": (37, 99, 235),
    "accent_violet": (124, 58, 237),
    "deep_bg": (2, 6, 23),
    "slate_900": (15, 23, 42),
    "slate_700": (51, 65, 85),
    "slate_400": (148, 163, 184),
    "slate_300": (203, 213, 225),
    "slate_200": (226, 232, 240),
    "slate_50": (248, 250, 252),
    "white": (255, 255, 255),
    "node_blue": (96, 165, 250),
}


# ─── Font loading ────────────────────────────────────────────────────
def load_font(weight, size_pt, dpi=300):
    """Load Inter font at given weight and point size for target DPI."""
    weight_map = {
        400: "Inter-Medium.ttf",  # No Inter-Regular static, Medium is closest
        500: "Inter-Medium.ttf",
        600: "Inter-SemiBold.ttf",
        700: "Inter-Bold.ttf",
        800: "Inter-ExtraBold.ttf",
        900: "Inter-Black.ttf",
    }
    fname = weight_map.get(weight, "Inter-Medium.ttf")
    fpath = os.path.join(FONT_DIR, fname)
    if not os.path.exists(fpath):
        fpath = os.path.join(r"C:\Windows\Fonts", fname)
    if not os.path.exists(fpath):
        # Last resort: variable font
        var_font = os.path.join(FONT_DIR, "Inter-VariableFont_opsz,wght.ttf")
        if os.path.exists(var_font):
            fpath = var_font
        else:
            print(f"  WARN  Font not found: {fname}, using default")
            return ImageFont.load_default()
    size_px = int(round(size_pt * dpi / 72))
    return ImageFont.truetype(fpath, size_px)


# ─── Text rendering with tracking ────────────────────────────────────
def measure_tracked_text(font, text, tracking_em=0, word_spacing_em=0):
    """Measure width of text with letter-spacing and word-spacing."""
    if not text:
        return 0
    font_size = font.size
    letter_space = tracking_em * font_size
    word_extra = word_spacing_em * font_size

    total_w = 0
    for i, ch in enumerate(text):
        bbox = font.getbbox(ch)
        char_w = bbox[2] - bbox[0]
        total_w += char_w
        if i < len(text) - 1:
            total_w += letter_space
        if ch == " ":
            total_w += word_extra
    return int(math.ceil(total_w))


def draw_tracked_text(draw, xy, text, font, fill, tracking_em=0, word_spacing_em=0):
    """Draw text character by character with precise tracking and word-spacing."""
    x, y = xy
    font_size = font.size
    letter_space = tracking_em * font_size
    word_extra = word_spacing_em * font_size

    for i, ch in enumerate(text):
        draw.text((x, y), ch, font=font, fill=fill)
        bbox = font.getbbox(ch)
        char_w = bbox[2] - bbox[0]
        x += char_w + letter_space
        if ch == " ":
            x += word_extra
    return x  # return end x position


def render_text_layer(text, font, fill, tracking_em=0, word_spacing_em=0):
    """Render text to a transparent RGBA image with tracking."""
    w = measure_tracked_text(font, text, tracking_em, word_spacing_em) + 4
    ascent, descent = font.getmetrics()
    h = ascent + descent + 4
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw_tracked_text(draw, (2, 2), text, font, fill + (255,), tracking_em, word_spacing_em)
    return img


def render_two_color_wordmark(text1, color1, text2, color2, font,
                              tracking_em=0.06, word_spacing_em=0.2):
    """Render 'AEGIS NETWORK' with two colors, proper tracking + word-spacing."""
    w1 = measure_tracked_text(font, text1, tracking_em, word_spacing_em)
    # Space between the two words
    space_w = int(font.size * word_spacing_em) + font.getbbox(" ")[2]
    w2 = measure_tracked_text(font, text2, tracking_em, word_spacing_em)
    total_w = w1 + space_w + w2 + 8
    ascent, descent = font.getmetrics()
    h = ascent + descent + 4
    img = Image.new("RGBA", (total_w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    end_x = draw_tracked_text(draw, (2, 2), text1, font, color1 + (255,), tracking_em, word_spacing_em)
    # Add word space
    end_x += space_w - (tracking_em * font.size)  # word space minus the tracking already added
    draw_tracked_text(draw, (end_x, 2), text2, font, color2 + (255,), tracking_em, word_spacing_em)
    return img


# ─── SVG symbol rendering via PNG ────────────────────────────────────
def load_symbol_png(size, variant="gradient"):
    """Load pre-rendered symbol PNG from components."""
    comp_dir = os.path.join(OUT, "02_COMPONENTS_REUSABLE", "symbol")
    # Find closest available size
    available = [256, 512, 1024, 2048]
    closest = min(available, key=lambda s: abs(s - size))
    fname = f"symbol-{variant}-{closest}.png"
    fpath = os.path.join(comp_dir, fname)
    if os.path.exists(fpath):
        img = Image.open(fpath).convert("RGBA")
        if img.size[0] != size:
            img = img.resize((size, size), Image.LANCZOS)
        return img
    # Fallback: create a placeholder
    print(f"  WARN  Symbol not found: {fpath}")
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    return img


def load_lockup_png(name):
    """Load pre-rendered lockup PNG from temp or components."""
    comp_dir = os.path.join(OUT, "02_COMPONENTS_REUSABLE", "wordmark")
    # Try wordmark first
    for d in [comp_dir, os.path.join(OUT, "03_EXPORTS_FINAL", "png")]:
        if os.path.exists(d):
            for f in os.listdir(d):
                if name in f.lower() and f.endswith(".png"):
                    return Image.open(os.path.join(d, f)).convert("RGBA")
    return None


# ─── Gradient bar rendering ──────────────────────────────────────────
def render_gradient_bar(width, height):
    """Create horizontal gradient bar: blue → violet → blue."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels = img.load()
    for x in range(width):
        t = x / max(width - 1, 1)
        if t < 0.5:
            t2 = t * 2
            r = int(COL["optical_blue"][0] * (1 - t2) + COL["accent_violet"][0] * t2)
            g = int(COL["optical_blue"][1] * (1 - t2) + COL["accent_violet"][1] * t2)
            b = int(COL["optical_blue"][2] * (1 - t2) + COL["accent_violet"][2] * t2)
        else:
            t2 = (t - 0.5) * 2
            r = int(COL["accent_violet"][0] * (1 - t2) + COL["optical_blue"][0] * t2)
            g = int(COL["accent_violet"][1] * (1 - t2) + COL["optical_blue"][1] * t2)
            b = int(COL["accent_violet"][2] * (1 - t2) + COL["optical_blue"][2] * t2)
        for y in range(height):
            pixels[x, y] = (r, g, b, 255)
    return img


def render_vertical_gradient_bar(width, height):
    """Create vertical gradient bar: blue → violet."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    pixels = img.load()
    for y in range(height):
        t = y / max(height - 1, 1)
        r = int(COL["aegis_blue"][0] * (1 - t) + COL["accent_violet"][0] * t)
        g = int(COL["aegis_blue"][1] * (1 - t) + COL["accent_violet"][1] * t)
        b = int(COL["aegis_blue"][2] * (1 - t) + COL["accent_violet"][2] * t)
        for x in range(width):
            pixels[x, y] = (r, g, b, 255)
    return img


# ─── RLE Packbits compression ────────────────────────────────────────
def packbits_encode(data):
    """Encode bytes using PackBits (RLE) compression as per PSD spec."""
    result = bytearray()
    i = 0
    n = len(data)
    while i < n:
        # Look for a run of identical bytes
        run_start = i
        if i + 1 < n and data[i] == data[i + 1]:
            # Count run
            j = i + 1
            while j < n and j - run_start < 128 and data[j] == data[run_start]:
                j += 1
            run_len = j - run_start
            result.append((257 - run_len) & 0xFF)  # -(run_len - 1) as unsigned byte
            result.append(data[run_start])
            i = j
        else:
            # Literal run: collect non-repeating bytes
            j = i
            while j < n and j - i < 128:
                if j + 1 < n and data[j] == data[j + 1]:
                    # Check if there's a run of 3+ (worth encoding as run)
                    if j + 2 < n and data[j] == data[j + 2]:
                        break
                j += 1
            lit_len = j - i
            if lit_len > 0:
                result.append(lit_len - 1)
                result.extend(data[i:j])
            i = j
    return bytes(result)


# ─── PSD Writer with RLE compression ─────────────────────────────────
def write_psd(filepath, canvas_w, canvas_h, layers, bg_color=None, dpi=300):
    """
    Write a valid PSD file with:
      - Named layers (with Unicode names)
      - RLE (packbits) compression for layer data and composite
      - 300 DPI resolution info
      - Proper RGBA channels

    layers: list of dict:
      - name: str
      - image: PIL.Image (RGBA)
      - x, y: int (offset on canvas)
      - visible: bool (default True)
    """
    data = bytearray()

    # ─── File Header ───
    data.extend(b"8BPS")                        # Signature
    data.extend(struct.pack(">H", 1))           # Version 1
    data.extend(b"\x00" * 6)                    # Reserved
    data.extend(struct.pack(">H", 4))           # 4 channels (RGBA)
    data.extend(struct.pack(">I", canvas_h))    # Height
    data.extend(struct.pack(">I", canvas_w))    # Width
    data.extend(struct.pack(">H", 8))           # 8-bit depth
    data.extend(struct.pack(">H", 3))           # RGB color mode

    # ─── Color Mode Data ───
    data.extend(struct.pack(">I", 0))

    # ─── Image Resources ───
    res_data = bytearray()

    # Resolution info (0x03ED)
    res_data.extend(b"8BIM")
    res_data.extend(struct.pack(">H", 0x03ED))
    res_data.extend(struct.pack(">H", 0))       # Pascal string (empty name)
    # Resolution info block: hRes (16.16 fixed), hResUnit, widthUnit, vRes, vResUnit, heightUnit
    res_info = bytearray()
    # Fixed point 16.16: DPI as integer part, 0 fractional
    res_info.extend(struct.pack(">HH", dpi, 0))  # hRes fixed 16.16
    res_info.extend(struct.pack(">H", 1))         # hRes unit: pixels/inch
    res_info.extend(struct.pack(">H", 1))         # width unit: inches
    res_info.extend(struct.pack(">HH", dpi, 0))  # vRes fixed 16.16
    res_info.extend(struct.pack(">H", 1))         # vRes unit: pixels/inch
    res_info.extend(struct.pack(">H", 1))         # height unit: inches
    res_data.extend(struct.pack(">I", len(res_info)))
    res_data.extend(res_info)

    data.extend(struct.pack(">I", len(res_data)))
    data.extend(res_data)

    # ─── Layer and Mask Information ───
    layer_section = bytearray()
    layer_info = bytearray()
    layer_count = len(layers)
    layer_info.extend(struct.pack(">h", layer_count))

    # Prepare compressed channel data for all layers
    all_layer_channel_data = []

    for layer in layers:
        img = layer["image"]
        name = layer.get("name", "Layer")
        x = layer.get("x", 0)
        y = layer.get("y", 0)
        visible = layer.get("visible", True)

        if img.mode != "RGBA":
            img = img.convert("RGBA")

        w, h = img.size

        # Layer record: top, left, bottom, right
        layer_info.extend(struct.pack(">i", y))
        layer_info.extend(struct.pack(">i", x))
        layer_info.extend(struct.pack(">i", y + h))
        layer_info.extend(struct.pack(">i", x + w))

        # Channels: 4 (A, R, G, B)
        layer_info.extend(struct.pack(">H", 4))

        # Compress each channel with RLE
        r_ch, g_ch, b_ch, a_ch = img.split()
        channels = [
            (-1, np.array(a_ch, dtype=np.uint8)),
            (0, np.array(r_ch, dtype=np.uint8)),
            (1, np.array(g_ch, dtype=np.uint8)),
            (2, np.array(b_ch, dtype=np.uint8)),
        ]

        layer_channels = []
        for ch_id, ch_arr in channels:
            # RLE compress row by row
            row_data_parts = []
            row_byte_counts = []
            for row_idx in range(h):
                row_bytes = ch_arr[row_idx].tobytes()
                compressed = packbits_encode(row_bytes)
                row_data_parts.append(compressed)
                row_byte_counts.append(len(compressed))

            # Channel data: compression type (1=RLE) + row byte counts + compressed rows
            ch_data = bytearray()
            ch_data.extend(struct.pack(">H", 1))  # Compression: RLE
            for bc in row_byte_counts:
                ch_data.extend(struct.pack(">H", bc))
            for rd in row_data_parts:
                ch_data.extend(rd)

            layer_channels.append((ch_id, bytes(ch_data)))

            # In layer record: channel ID + data length
            layer_info.extend(struct.pack(">h", ch_id))
            layer_info.extend(struct.pack(">I", len(ch_data)))

        all_layer_channel_data.append(layer_channels)

        # Blend mode
        layer_info.extend(b"8BIM")
        layer_info.extend(b"norm")
        layer_info.extend(struct.pack(">B", 255))  # Opacity
        layer_info.extend(struct.pack(">B", 0))    # Clipping
        flags = 0 if visible else 2
        layer_info.extend(struct.pack(">B", flags))
        layer_info.extend(b"\x00")  # Filler

        # Extra data
        extra = bytearray()
        extra.extend(struct.pack(">I", 0))  # Layer mask data (empty)
        extra.extend(struct.pack(">I", 0))  # Blending ranges (empty)

        # Pascal string layer name (padded to 4 bytes)
        name_bytes = name.encode("ascii", errors="replace")[:255]
        pascal = struct.pack(">B", len(name_bytes)) + name_bytes
        while len(pascal) % 4 != 0:
            pascal += b"\x00"
        extra.extend(pascal)

        # Unicode layer name ('luni')
        uni_name = name.encode("utf-16-be")
        luni_data = struct.pack(">I", len(name)) + uni_name
        if len(name) % 2:
            luni_data += b"\x00\x00"
        extra.extend(b"8BIM")
        extra.extend(b"luni")
        extra.extend(struct.pack(">I", len(luni_data)))
        extra.extend(luni_data)
        if len(extra) % 2:
            extra.extend(b"\x00")

        layer_info.extend(struct.pack(">I", len(extra)))
        layer_info.extend(extra)

    # Append all channel image data
    for layer_chs in all_layer_channel_data:
        for ch_id, ch_data in layer_chs:
            layer_info.extend(ch_data)

    # Pad layer info to even
    if len(layer_info) % 2:
        layer_info.extend(b"\x00")

    layer_section.extend(struct.pack(">I", len(layer_info)))
    layer_section.extend(layer_info)

    # Global layer mask info (empty)
    layer_section.extend(struct.pack(">I", 0))

    data.extend(struct.pack(">I", len(layer_section)))
    data.extend(layer_section)

    # ─── Image Data (merged composite) ───
    composite = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
    if bg_color:
        bg = Image.new("RGBA", (canvas_w, canvas_h), (*bg_color, 255))
        composite = Image.alpha_composite(composite, bg)

    for layer in layers:
        if layer.get("visible", True):
            img = layer["image"].convert("RGBA")
            temp = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 0))
            temp.paste(img, (layer.get("x", 0), layer.get("y", 0)))
            composite = Image.alpha_composite(composite, temp)

    # RLE compress composite
    r_ch, g_ch, b_ch, a_ch = composite.split()
    comp_channels = [
        np.array(a_ch, dtype=np.uint8),
        np.array(r_ch, dtype=np.uint8),
        np.array(g_ch, dtype=np.uint8),
        np.array(b_ch, dtype=np.uint8),
    ]

    data.extend(struct.pack(">H", 1))  # Compression: RLE

    # Collect all row byte counts first, then all row data
    all_row_counts = []
    all_row_data = []
    for ch_arr in comp_channels:
        for row_idx in range(canvas_h):
            compressed = packbits_encode(ch_arr[row_idx].tobytes())
            all_row_counts.append(len(compressed))
            all_row_data.append(compressed)

    for bc in all_row_counts:
        data.extend(struct.pack(">H", bc))
    for rd in all_row_data:
        data.extend(rd)

    with open(filepath, "wb") as f:
        f.write(bytes(data))

    size_kb = os.path.getsize(filepath) / 1024
    if size_kb > 1024:
        size_str = f"{size_kb / 1024:.1f} MB"
    else:
        size_str = f"{size_kb:.0f} KB"
    print(f"  PSD   {os.path.basename(filepath)} ({size_str}, {canvas_w}x{canvas_h})")


# ══════════════════════════════════════════════════════════════════════
# PSD BUILDERS
# ══════════════════════════════════════════════════════════════════════

def build_business_card_recto():
    """
    Carte de visite recto — fond clair (#F8FAFC)
    85×55mm @ 300dpi = 1004×650px
    Layout from validated HTML reference.
    """
    print("\n  Building business-card-recto.psd...")
    W, H = 1004, 650
    PADDING = 80  # ~7mm safe zone at 300dpi
    layers = []

    # 1. Background
    bg = Image.new("RGBA", (W, H), COL["slate_50"] + (255,))
    layers.append({"name": "Background #F8FAFC", "image": bg, "x": 0, "y": 0})

    # 2. Vertical accent bar (left edge)
    accent = render_vertical_gradient_bar(9, H)
    layers.append({"name": "Accent Bar (gradient)", "image": accent, "x": 0, "y": 0})

    # 3. Subtle radial glow (bottom-right decoration)
    glow = Image.new("RGBA", (500, 500), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for r in range(250, 0, -1):
        alpha = int(15 * (r / 250))
        glow_draw.ellipse([250 - r, 250 - r, 250 + r, 250 + r],
                          fill=COL["aegis_blue"] + (alpha,))
    layers.append({"name": "Decoration (radial glow)", "image": glow, "x": W - 380, "y": H - 380, "visible": True})

    # 4. Symbol (small, top-left with brand text)
    sym = load_symbol_png(82, "gradient")
    layers.append({"name": "Symbol Aegis", "image": sym, "x": PADDING + 14, "y": PADDING})

    # 5. Wordmark "AEGIS NETWORK"
    font_wm = load_font(900, 6.5)  # ~0.7rem equiv at 300dpi
    wm_img = render_two_color_wordmark(
        "AEGIS", COL["slate_900"], "NETWORK", COL["aegis_blue"], font_wm
    )
    layers.append({
        "name": "Wordmark AEGIS NETWORK (0.06em)",
        "image": wm_img,
        "x": PADDING + 14 + 82 + 28,
        "y": PADDING + (82 - wm_img.height) // 2,
    })

    # 6. Name
    font_name = load_font(800, 10)
    name_img = render_text_layer("Ludovic ROCHET-BELLAVIA", font_name,
                                 COL["slate_900"], tracking_em=-0.01)
    layers.append({"name": "Nom - Ludovic ROCHET-BELLAVIA", "image": name_img,
                   "x": PADDING + 14, "y": PADDING + 82 + 50})

    # 7. Title
    font_title = load_font(600, 6)
    title_img = render_text_layer("Consultant réseaux & téléphonie", font_title,
                                  COL["aegis_blue"], tracking_em=0.02)
    layers.append({"name": "Titre - Consultant réseaux & téléphonie", "image": title_img,
                   "x": PADDING + 14, "y": PADDING + 82 + 50 + name_img.height + 8})

    # 8-10. Contact info
    font_contact = load_font(400, 5.5)
    contact_y = H - PADDING - 100
    contact_lines = [
        ("04 82 53 26 99", "Tel"),
        ("contact@aegisnetwork.fr", "Email"),
        ("aegisnetwork.fr", "Web"),
    ]
    for i, (text, label) in enumerate(contact_lines):
        ci = render_text_layer(text, font_contact, COL["slate_700"])
        layers.append({
            "name": f"Contact - {label}: {text}",
            "image": ci,
            "x": PADDING + 14,
            "y": contact_y + i * (ci.height + 8),
        })

    write_psd(os.path.join(PSD_DOCS, "business-card-recto.psd"), W, H, layers,
              bg_color=COL["slate_50"])


def build_business_card_verso():
    """
    Carte de visite verso — fond sombre (gradient slate-900 → #131B2E)
    Centred: symbol + wordmark + baseline + URL
    """
    print("  Building business-card-verso.psd...")
    W, H = 1004, 650
    layers = []

    # 1. Background (dark gradient approximation)
    bg = Image.new("RGBA", (W, H), COL["slate_900"] + (255,))
    layers.append({"name": "Background #0F172A", "image": bg, "x": 0, "y": 0})

    # 2. Subtle radial glows (top-left blue, bottom-right violet)
    glow1 = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
    d1 = ImageDraw.Draw(glow1)
    for r in range(200, 0, -1):
        alpha = int(10 * (r / 200))
        d1.ellipse([200 - r, 200 - r, 200 + r, 200 + r],
                    fill=COL["aegis_blue"] + (alpha,))
    layers.append({"name": "Glow blue (decoration)", "image": glow1, "x": -100, "y": -80})

    glow2 = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
    d2 = ImageDraw.Draw(glow2)
    for r in range(200, 0, -1):
        alpha = int(6 * (r / 200))
        d2.ellipse([200 - r, 200 - r, 200 + r, 200 + r],
                    fill=COL["accent_violet"] + (alpha,))
    layers.append({"name": "Glow violet (decoration)", "image": glow2, "x": W - 300, "y": H - 300})

    # 3. Symbol (centred)
    sym_size = 164
    sym = load_symbol_png(sym_size, "gradient")
    sym_x = (W - sym_size) // 2
    sym_y = (H // 2) - sym_size // 2 - 60
    layers.append({"name": "Symbol Aegis", "image": sym, "x": sym_x, "y": sym_y})

    # 4. Wordmark "AEGIS NETWORK"
    font_wm = load_font(900, 8.5)
    wm = render_two_color_wordmark(
        "AEGIS", COL["white"], "NETWORK", COL["optical_blue"], font_wm
    )
    wm_x = (W - wm.width) // 2
    wm_y = sym_y + sym_size + 30
    layers.append({"name": "Wordmark AEGIS NETWORK (0.06em)", "image": wm, "x": wm_x, "y": wm_y})

    # 5. Baseline "CONSEIL & OPTIMISATION IT"
    font_base = load_font(700, 4)
    base = render_text_layer("CONSEIL & OPTIMISATION IT", font_base,
                             COL["slate_400"], tracking_em=0.25)
    base_x = (W - base.width) // 2
    base_y = wm_y + wm.height + 12
    layers.append({"name": "Baseline (0.25em)", "image": base, "x": base_x, "y": base_y})

    # 6. URL
    font_url = load_font(400, 4)
    url = render_text_layer("aegisnetwork.fr", font_url, COL["slate_700"], tracking_em=0.05)
    url_x = (W - url.width) // 2
    url_y = base_y + base.height + 30
    layers.append({"name": "URL aegisnetwork.fr", "image": url, "x": url_x, "y": url_y})

    write_psd(os.path.join(PSD_DOCS, "business-card-verso.psd"), W, H, layers,
              bg_color=COL["slate_900"])


def build_email_signature():
    """
    Signature email — 1200×400px (digital)
    Layout: bar top + symbol left + text block right
    """
    print("  Building email-signature.psd...")
    W, H = 1200, 400
    layers = []

    # 1. Background
    bg = Image.new("RGBA", (W, H), COL["deep_bg"] + (255,))
    layers.append({"name": "Background #020617", "image": bg, "x": 0, "y": 0})

    # 2. Gradient bar top
    bar = render_gradient_bar(W, 6)
    layers.append({"name": "Gradient Bar Top", "image": bar, "x": 0, "y": 0})

    # 3. Symbol
    sym = load_symbol_png(120, "gradient")
    layers.append({"name": "Symbol Aegis", "image": sym, "x": 50, "y": (H - 120) // 2})

    # 4. Separator line
    sep = Image.new("RGBA", (2, 150), COL["slate_700"] + (80,))
    layers.append({"name": "Separator", "image": sep, "x": 200, "y": (H - 150) // 2})

    # Text block starts at x=230
    tx = 240
    ty_base = 100

    # 5. Name
    font_name = load_font(800, 11)
    name_img = render_text_layer("Ludovic ROCHET-BELLAVIA", font_name, COL["white"])
    layers.append({"name": "Nom - Ludovic ROCHET-BELLAVIA", "image": name_img, "x": tx, "y": ty_base})

    # 6. Title
    font_title = load_font(600, 7)
    title_img = render_text_layer("Consultant réseaux & téléphonie", font_title,
                                  COL["optical_blue"], tracking_em=0.02)
    layers.append({"name": "Titre", "image": title_img, "x": tx, "y": ty_base + name_img.height + 8})

    # 7. Wordmark "AEGIS NETWORK"
    font_wm = load_font(900, 6)
    wm = render_two_color_wordmark("AEGIS", COL["white"], "NETWORK", COL["optical_blue"], font_wm)
    layers.append({"name": "Wordmark AEGIS NETWORK (0.06em)", "image": wm,
                   "x": tx, "y": ty_base + name_img.height + title_img.height + 30})

    # 8. Contact info
    font_c = load_font(400, 5.5)
    ci_y = ty_base + name_img.height + title_img.height + 30 + wm.height + 16
    for text, label in [("04 82 53 26 99", "Tel"), ("contact@aegisnetwork.fr", "Email")]:
        ci = render_text_layer(text, font_c, COL["slate_300"])
        layers.append({"name": f"Contact - {label}", "image": ci, "x": tx, "y": ci_y})
        ci_y += ci.height + 6

    write_psd(os.path.join(PSD_DOCS, "email-signature.psd"), W, H, layers,
              bg_color=COL["deep_bg"])


def build_lockup_psd(variant="sombre"):
    """
    Lockup PSD — decomposed into Symbol + Wordmark + Baseline layers.
    Uses pre-rendered symbol and renders text with Pillow.
    """
    is_dark = variant == "sombre"
    suffix = "fond-sombre" if is_dark else "fond-clair"
    print(f"  Building lockup-{suffix}.psd...")

    # Canvas proportional to SVG viewBox 460x120, scaled to 4000px wide
    CW, CH = 4000, 1044

    layers = []

    # 1. Background
    bg_col = COL["deep_bg"] if is_dark else COL["slate_50"]
    bg = Image.new("RGBA", (CW, CH), bg_col + (255,))
    layers.append({"name": f"Background {'#020617' if is_dark else '#F8FAFC'}",
                   "image": bg, "x": 0, "y": 0})

    # 2. Symbol (left side of lockup, centred vertically)
    sym_variant = "gradient" if is_dark else "dark"
    sym_size = int(CH * 0.8)  # 80% of canvas height
    sym = load_symbol_png(sym_size, sym_variant)
    sym_x = int(CW * 0.05)
    sym_y = (CH - sym_size) // 2
    layers.append({"name": f"Symbol ({sym_variant})", "image": sym, "x": sym_x, "y": sym_y})

    # 3. Wordmark — rendered at appropriate size
    # In the SVG lockup, text starts at roughly 44% of width
    text_x = int(CW * 0.33)
    font_wm = load_font(900, 28)  # Large for 4000px canvas

    if is_dark:
        wm = render_two_color_wordmark("AEGIS", COL["white"], "NETWORK", COL["optical_blue"], font_wm)
    else:
        wm = render_two_color_wordmark("AEGIS", COL["slate_900"], "NETWORK", COL["aegis_blue"], font_wm)
    wm_y = (CH // 2) - wm.height + 20
    layers.append({"name": "Wordmark AEGIS NETWORK (0.06em)", "image": wm, "x": text_x, "y": wm_y})

    # 4. Baseline
    font_base = load_font(700, 9)
    base_color = COL["slate_400"] if is_dark else (100, 116, 139)  # slate-500
    base = render_text_layer("CONSEIL & OPTIMISATION IT", font_base,
                             base_color, tracking_em=0.25)
    base_y = wm_y + wm.height + 15
    layers.append({"name": "Baseline CONSEIL & OPTIMISATION IT (0.25em)",
                   "image": base, "x": text_x, "y": base_y})

    write_psd(os.path.join(PSD_LOGOS, f"lockup-{suffix}.psd"), CW, CH, layers,
              bg_color=bg_col)


def build_logo_master(variant="sombre"):
    """Logo master PSD — symbol centred on 4000×4000 canvas."""
    is_dark = variant == "sombre"
    suffix = "fond-sombre" if is_dark else "fond-clair"
    print(f"  Building logo-master-{suffix}.psd...")

    S = 4000
    layers = []

    bg_col = COL["deep_bg"] if is_dark else COL["slate_50"]
    bg = Image.new("RGBA", (S, S), bg_col + (255,))
    layers.append({"name": f"Background {'#020617' if is_dark else '#F8FAFC'}",
                   "image": bg, "x": 0, "y": 0})

    sym_variant = "gradient" if is_dark else "dark"
    sym = load_symbol_png(2048, sym_variant)
    sx = (S - 2048) // 2
    sy = (S - 2048) // 2
    layers.append({"name": f"Symbol - {sym_variant.title()}", "image": sym,
                   "x": sx, "y": sy})

    write_psd(os.path.join(PSD_LOGOS, f"logo-master-{suffix}.psd"), S, S, layers,
              bg_color=bg_col)


def build_symbol_variants():
    """Symbol variants PSD — 5 variants as togglable layers."""
    print("  Building symbol-all-variants.psd...")
    S = 2400
    variants = [
        ("gradient", "Symbol Gradient + Nodes"),
        ("clean", "Symbol Clean (no nodes)"),
        ("white", "Symbol White"),
        ("blue", "Symbol Blue"),
        ("dark", "Symbol Dark"),
    ]
    layers = []
    for i, (v, name) in enumerate(variants):
        sym = load_symbol_png(2000, v)
        cx = (S - 2000) // 2
        cy = (S - 2000) // 2
        # Try loading the variant
        comp_dir = os.path.join(OUT, "02_COMPONENTS_REUSABLE", "symbol")
        candidates = [f for f in os.listdir(comp_dir) if v in f and "2048" in f and f.endswith(".png")]
        if candidates:
            sym = Image.open(os.path.join(comp_dir, candidates[0])).convert("RGBA")
            sym = sym.resize((2000, 2000), Image.LANCZOS)
        layers.append({
            "name": name,
            "image": sym,
            "x": cx, "y": cy,
            "visible": i == 0,
        })

    write_psd(os.path.join(PSD_LOGOS, "symbol-all-variants.psd"), S, S, layers)


def build_wordmark_variants():
    """Wordmark PSD — both dark and light variants as layers."""
    print("  Building wordmark-variants.psd...")
    font_wm = load_font(900, 28)

    wm_dark = render_two_color_wordmark("AEGIS", COL["white"], "NETWORK", COL["optical_blue"], font_wm)
    wm_light = render_two_color_wordmark("AEGIS", COL["slate_900"], "NETWORK", COL["aegis_blue"], font_wm)

    w = max(wm_dark.width, wm_light.width) + 200
    h = max(wm_dark.height, wm_light.height) + 200

    layers = [
        {"name": "Wordmark - Fond Sombre (white+blue, 0.06em)",
         "image": wm_dark,
         "x": (w - wm_dark.width) // 2,
         "y": (h - wm_dark.height) // 2,
         "visible": True},
        {"name": "Wordmark - Fond Clair (dark+blue, 0.06em)",
         "image": wm_light,
         "x": (w - wm_light.width) // 2,
         "y": (h - wm_light.height) // 2,
         "visible": False},
    ]

    write_psd(os.path.join(PSD_LOGOS, "wordmark-variants.psd"), w, h, layers)


def build_monochromes():
    """Monochrome variants PSD — 3 variants as togglable layers."""
    print("  Building monochromes-all.psd...")
    S = 2400
    comp_dir = os.path.join(OUT, "03_EXPORTS_FINAL", "png")
    mono_files = [
        ("aegis-logo-monochrome-blanc", "Monochrome White"),
        ("aegis-logo-monochrome-bleu", "Monochrome Blue"),
        ("aegis-logo-monochrome-sombre", "Monochrome Dark"),
    ]
    layers = []
    for i, (prefix, name) in enumerate(mono_files):
        # Find the PNG
        found = None
        if os.path.exists(comp_dir):
            for f in os.listdir(comp_dir):
                if prefix in f and f.endswith(".png"):
                    found = os.path.join(comp_dir, f)
                    break
        if found:
            img = Image.open(found).convert("RGBA")
            img = img.resize((2000, 2000), Image.LANCZOS)
        else:
            img = Image.new("RGBA", (2000, 2000), (0, 0, 0, 0))
            print(f"  WARN  Not found: {prefix}")
        cx = (S - 2000) // 2
        cy = (S - 2000) // 2
        layers.append({"name": name, "image": img, "x": cx, "y": cy, "visible": i == 0})

    write_psd(os.path.join(PSD_LOGOS, "monochromes-all.psd"), S, S, layers)


def build_decorative_elements():
    """Decorative elements PSD — fiber nodes + gradient bar."""
    print("  Building decorative-elements.psd...")
    CW, CH = 4000, 2000
    layers = []

    # Fiber nodes
    nodes = load_symbol_png(1024, "gradient")  # Use symbol as fallback
    comp_elem = os.path.join(OUT, "02_COMPONENTS_REUSABLE", "elements")
    if os.path.exists(os.path.join(comp_elem, "fiber-nodes-1024.png")):
        nodes = Image.open(os.path.join(comp_elem, "fiber-nodes-1024.png")).convert("RGBA")
    layers.append({"name": "Fiber Nodes", "image": nodes, "x": 100, "y": 100})

    # Gradient bar
    bar = render_gradient_bar(CW, 60)
    layers.append({"name": "Gradient Bar", "image": bar, "x": 0, "y": 1000})

    write_psd(os.path.join(PSD_LOGOS, "decorative-elements.psd"), CW, CH, layers)


def build_flyer_psd(size="A5"):
    """Flyer PSD — uses pre-rendered PNG from delivery."""
    dims = {"A5": (1748, 2480), "A4": (2480, 3508)}
    W, H = dims[size]
    print(f"  Building flyer-{size}.psd...")

    flyer_path = os.path.join(SRC, "07_FLYER", f"aegis-network-flyer-{size}.png")
    layers = []

    bg = Image.new("RGBA", (W, H), COL["deep_bg"] + (255,))
    layers.append({"name": "Background #020617", "image": bg, "x": 0, "y": 0})

    if os.path.exists(flyer_path):
        flyer = Image.open(flyer_path).convert("RGBA").resize((W, H), Image.LANCZOS)
        layers.append({"name": f"Flyer {size} (from HTML render)", "image": flyer, "x": 0, "y": 0})
    else:
        print(f"  SKIP  Flyer {size} PNG not found at {flyer_path}")
        return

    write_psd(os.path.join(PSD_DOCS, f"flyer-{size}.psd"), W, H, layers,
              bg_color=COL["deep_bg"])


# ══════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════
def main():
    print("=" * 60)
    print("  AEGIS NETWORK — PSD Reconstruction")
    print("  Based on validated baseline (2025-03-13)")
    print("  Wordmark: 0.06em + word-spacing 0.2em")
    print("=" * 60)

    os.makedirs(PSD_LOGOS, exist_ok=True)
    os.makedirs(PSD_DOCS, exist_ok=True)

    # ── Logos ──
    print("\n▸ LOGOS")
    build_logo_master("sombre")
    build_logo_master("clair")
    build_lockup_psd("sombre")
    build_lockup_psd("clair")
    build_symbol_variants()
    build_monochromes()
    build_wordmark_variants()
    build_decorative_elements()

    # ── Documents ──
    print("\n▸ DOCUMENTS")
    build_business_card_recto()
    build_business_card_verso()
    build_email_signature()
    build_flyer_psd("A5")
    build_flyer_psd("A4")

    print("\n" + "=" * 60)
    print("  PSD reconstruction complete!")
    print("=" * 60)


if __name__ == "__main__":
    main()
