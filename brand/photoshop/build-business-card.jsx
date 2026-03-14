#target photoshop

app.displayDialogs = DialogModes.NO;

var scriptDir = new File($.fileName).parent;
var brandDir = scriptDir.parent;
var manifestPath = $.getenv("AEGIS_BUSINESS_CARD_MANIFEST") || (brandDir.fsName + "/.generated/business-card/manifest.json");

function writeDebugLog(message) {
  try {
    var file = new File("C:/Dev/Aegisnetwork/brand/.generated/business-card/build-business-card-debug.txt");
    file.encoding = "UTF8";
    file.open("a");
    file.writeln(message);
    file.close();
  } catch (logError) {}
}

function formatError(error) {
  if (!error) return "Unknown error";
  var parts = [];
  if (error.name) parts.push("name=" + error.name);
  if (error.message) parts.push("message=" + error.message);
  if (error.line) parts.push("line=" + error.line);
  if (error.fileName) parts.push("file=" + error.fileName);
  if (error.number) parts.push("number=" + error.number);
  return parts.join(" | ") || String(error);
}

function readManifest(filePath) {
  var file = new File(filePath);
  if (!file.exists) {
    throw new Error("Manifest not found: " + filePath);
  }
  file.encoding = "UTF8";
  file.open("r");
  var content = file.read();
  file.close();
  return eval("(" + content + ")");
}

writeDebugLog("--- Build start ---");
writeDebugLog("Manifest path: " + manifestPath);
var manifest = readManifest(manifestPath);
writeDebugLog("Manifest loaded");
var DOC = manifest.document;

function px(value) {
  return UnitValue(value, "px");
}

function ptFromPx(value) {
  return UnitValue((value * 72) / DOC.resolution, "pt");
}

function rgb(color) {
  var solid = new SolidColor();
  solid.rgb.red = color.r;
  solid.rgb.green = color.g;
  solid.rgb.blue = color.b;
  return solid;
}

function ensureFolder(folderPath) {
  var folder = new Folder(folderPath);
  if (!folder.exists) {
    folder.create();
  }
}

function selectRect(doc, left, top, right, bottom) {
  doc.selection.select([
    [left, top],
    [right, top],
    [right, bottom],
    [left, bottom]
  ]);
}

function addGroup(container, name) {
  var group = container.layerSets.add();
  group.name = name;
  return group;
}

function removeInitialArtLayer(doc) {
  if (doc.artLayers.length !== 1) {
    return;
  }

  var layer = doc.artLayers[0];
  if (layer.name === "Layer 1" || layer.name === "Calque 1") {
    layer.remove();
  }
}

function addSolidLayer(doc, group, name, color, left, top, right, bottom) {
  var layer = doc.artLayers.add();
  layer.name = name;
  layer.move(group, ElementPlacement.INSIDE);
  doc.activeLayer = layer;
  selectRect(doc, left, top, right, bottom);
  doc.selection.fill(rgb(color));
  doc.selection.deselect();
  return layer;
}

function placeAsset(doc, group, assetPath, layerName, left, top, targetWidth, targetHeight) {
  var sourceFile = new File(assetPath);
  if (!sourceFile.exists) {
    throw new Error("Asset missing: " + assetPath);
  }

  var assetDoc = app.open(sourceFile);
  assetDoc.activeLayer.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
  assetDoc.close(SaveOptions.DONOTSAVECHANGES);

  app.activeDocument = doc;
  var layer = doc.activeLayer;
  layer.name = layerName;
  layer.move(group, ElementPlacement.INSIDE);

  var bounds = layer.bounds;
  var currentWidth = bounds[2].as("px") - bounds[0].as("px");
  var currentHeight = bounds[3].as("px") - bounds[1].as("px");

  if (currentWidth !== targetWidth || currentHeight !== targetHeight) {
    layer.resize((targetWidth / currentWidth) * 100, (targetHeight / currentHeight) * 100, AnchorPosition.TOPLEFT);
  }

  bounds = layer.bounds;
  layer.translate(left - bounds[0].as("px"), top - bounds[1].as("px"));
  return layer;
}

function addTextLayer(doc, group, spec) {
  var layer = doc.artLayers.add();
  layer.kind = LayerKind.TEXT;
  layer.name = spec.name;
  layer.move(group, ElementPlacement.INSIDE);
  doc.activeLayer = layer;

  var item = layer.textItem;
  item.kind = TextType.POINTTEXT;
  item.contents = spec.contents;
  item.font = spec.font;
  item.size = ptFromPx(spec.fontPx);
  item.color = rgb(spec.color);
  item.position = [px(spec.x), px(spec.y + (spec.fontPx * 0.75))];

  if (spec.tracking !== undefined) {
    item.tracking = spec.tracking;
  }

  return layer;
}

function moveGroupToBack(doc, group) {
  doc.activeLayer = group;
  group.move(doc, ElementPlacement.PLACEATEND);
}

function createDocument(name) {
  app.preferences.rulerUnits = Units.PIXELS;
  writeDebugLog("Create document: " + name);
  return app.documents.add(px(DOC.widthPx), px(DOC.heightPx), DOC.resolution, name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
}

function savePsd(doc, outputPath) {
  ensureFolder(new File(outputPath).parent.fsName);
  var options = new PhotoshopSaveOptions();
  options.alphaChannels = true;
  options.annotations = true;
  options.embedColorProfile = true;
  options.layers = true;
  options.maximizeCompatibility = true;
  writeDebugLog("Save PSD: " + outputPath);
  doc.saveAs(new File(outputPath), options, true, Extension.LOWERCASE);
}

function savePreviewPng(doc, outputPath) {
  ensureFolder(new File(outputPath).parent.fsName);
  var previewDoc = doc.duplicate();
  previewDoc.flatten();
  var options = new PNGSaveOptions();
  writeDebugLog("Save PNG: " + outputPath);
  previewDoc.saveAs(new File(outputPath), options, true, Extension.LOWERCASE);
  previewDoc.close(SaveOptions.DONOTSAVECHANGES);
}

function buildRecto(outputPath, previewPath, alt) {
  writeDebugLog("Build recto alt=" + alt);
  var doc = createDocument(alt ? "AEGIS - Business Card Recto Alt" : "AEGIS - Business Card Recto");
  var contentLeft = DOC.bleedPx + DOC.safePx + 30;
  var fontBlack = "Inter-Black";
  var fontBold = "Inter-Bold";
  var fontSemiBold = "Inter-SemiBold";
  var fontMedium = "Inter-Medium";

  writeDebugLog("Recto: create Fond group");
  var fond = addGroup(doc, "Fond");
  removeInitialArtLayer(doc);
  writeDebugLog("Recto: add base fill");
  addSolidLayer(doc, fond, alt ? "Fond blanc #FFFFFF" : "Fond clair #F8FAFC", alt ? manifest.colors.white : manifest.colors.slate50, 0, 0, DOC.widthPx, DOC.heightPx);
  if (alt) {
    writeDebugLog("Recto: place horizontal accent");
    placeAsset(doc, fond, manifest.paths.accentHorizontal, "Bandeau degrade haut", DOC.bleedPx, DOC.bleedPx, DOC.widthPx - (DOC.bleedPx * 2), 8);
  } else {
    writeDebugLog("Recto: place vertical accent");
    placeAsset(doc, fond, manifest.paths.accentVertical, "Barre accent gauche", DOC.bleedPx, DOC.bleedPx, 8, DOC.heightPx - (DOC.bleedPx * 2));
    writeDebugLog("Recto: place orb");
    placeAsset(doc, fond, manifest.paths.rectoOrb, "Orbe decoratif", DOC.widthPx - 400, DOC.heightPx - 400, 400, 400);
  }
  writeDebugLog("Recto: move Fond group back");
  moveGroupToBack(doc, fond);

  writeDebugLog("Recto: create Logo group");
  var logo = addGroup(doc, "Logo");
  var logoTop = DOC.bleedPx + DOC.safePx + (alt ? 16 : 0);
  var logoAsset = alt ? manifest.paths.logoGradient80 : manifest.paths.logoGradient80;
  writeDebugLog("Recto: place logo asset");
  placeAsset(doc, logo, logoAsset, "Symbole Aegis", contentLeft, logoTop, 80, 80);

  writeDebugLog("Recto: add wordmark");
  var aegis = addTextLayer(doc, logo, {
    name: "Wordmark AEGIS",
    contents: "AEGIS",
    font: fontBlack,
    fontPx: 18,
    color: manifest.colors.slate900,
    x: contentLeft + 96,
    y: DOC.bleedPx + DOC.safePx + (alt ? 43 : 33),
    tracking: 60
  });

  var aegisRight = aegis.bounds[2].as("px");

  addTextLayer(doc, logo, {
    name: "Wordmark NETWORK",
    contents: "NETWORK",
    font: fontBlack,
    fontPx: 18,
    color: manifest.colors.aegisBlue,
    x: aegisRight + 12,
    y: DOC.bleedPx + DOC.safePx + (alt ? 43 : 33),
    tracking: 60
  });

  writeDebugLog("Recto: create Identite group");
  var identite = addGroup(doc, "Identite");
  addTextLayer(doc, identite, {
    name: "Nom",
    contents: manifest.identity.name,
    font: fontBold,
    fontPx: 28,
    color: manifest.colors.slate900,
    x: contentLeft,
    y: DOC.bleedPx + DOC.safePx + (alt ? 130 : 119),
    tracking: -10
  });
  addTextLayer(doc, identite, {
    name: "Fonction",
    contents: manifest.identity.title,
    font: fontSemiBold,
    fontPx: 16,
    color: manifest.colors.aegisBlue,
    x: contentLeft,
    y: DOC.bleedPx + DOC.safePx + (alt ? 164 : 155),
    tracking: 20
  });

  writeDebugLog("Recto: create Contact group");
  var contact = addGroup(doc, "Contact");

  var phoneY = DOC.heightPx - DOC.bleedPx - DOC.safePx - 100;
  var emailY = DOC.heightPx - DOC.bleedPx - DOC.safePx - 60;
  var webY = DOC.heightPx - DOC.bleedPx - DOC.safePx - 34;
  var rightBlockX = DOC.widthPx - DOC.bleedPx - DOC.safePx - 220;

  writeDebugLog("Recto: place phone block");
  placeAsset(doc, contact, manifest.paths.iconPhone, "Icone telephone", contentLeft, phoneY, 28, 28);
  addTextLayer(doc, contact, {
    name: "Telephone",
    contents: manifest.contact.phone,
    font: fontMedium,
    fontPx: 15,
    color: manifest.colors.slate700,
    x: contentLeft + 38,
    y: phoneY + 4,
    tracking: 0
  });

  writeDebugLog("Recto: place mail block");
  placeAsset(doc, contact, manifest.paths.iconMail, "Icone email", contentLeft, emailY, 28, 28);
  addTextLayer(doc, contact, {
    name: "Email",
    contents: manifest.contact.email,
    font: fontMedium,
    fontPx: 15,
    color: manifest.colors.slate700,
    x: contentLeft + 38,
    y: emailY + 4,
    tracking: 0
  });

  writeDebugLog("Recto: place web block");
  placeAsset(doc, contact, manifest.paths.iconGlobe, "Icone site web", rightBlockX, webY, 28, 28);
  addTextLayer(doc, contact, {
    name: "Site web",
    contents: manifest.contact.website,
    font: fontMedium,
    fontPx: 15,
    color: manifest.colors.slate700,
    x: rightBlockX + 38,
    y: webY + 4,
    tracking: 0
  });

  writeDebugLog("Recto: save");
  savePsd(doc, outputPath);
  savePreviewPng(doc, previewPath);
  doc.close(SaveOptions.DONOTSAVECHANGES);
}

function buildVerso(outputPath, previewPath) {
  writeDebugLog("Build verso");
  var doc = createDocument("AEGIS - Business Card Verso");
  var fontBlack = "Inter-Black";
  var fontBold = "Inter-Bold";
  var fontMedium = "Inter-Medium";

  var fond = addGroup(doc, "Fond");
  removeInitialArtLayer(doc);
  placeAsset(doc, fond, manifest.paths.versoBackground, "Fond sombre degrade", 0, 0, DOC.widthPx, DOC.heightPx);
  placeAsset(doc, fond, manifest.paths.versoGlowBlue, "Lueur bleue", 0, 0, DOC.widthPx, DOC.heightPx);
  placeAsset(doc, fond, manifest.paths.versoGlowViolet, "Lueur violette", 0, 0, DOC.widthPx, DOC.heightPx);
  moveGroupToBack(doc, fond);

  var logo = addGroup(doc, "Logo");
  var symbolLeft = (DOC.widthPx - 160) / 2;
  var symbolTop = ((DOC.heightPx - 160) / 2) - 50;
  placeAsset(doc, logo, manifest.paths.logoGradient160, "Symbole Aegis", symbolLeft, symbolTop, 160, 160);

  var aegis = addTextLayer(doc, logo, {
    name: "Wordmark AEGIS",
    contents: "AEGIS",
    font: fontBlack,
    fontPx: 24,
    color: manifest.colors.white,
    x: (DOC.widthPx / 2) - 120,
    y: (DOC.heightPx / 2) + 49,
    tracking: 60
  });
  var aegisRight = aegis.bounds[2].as("px");

  addTextLayer(doc, logo, {
    name: "Wordmark NETWORK",
    contents: "NETWORK",
    font: fontBlack,
    fontPx: 24,
    color: manifest.colors.opticalBlue,
    x: aegisRight + 14,
    y: (DOC.heightPx / 2) + 49,
    tracking: 60
  });

  addTextLayer(doc, logo, {
    name: "Baseline",
    contents: "CONSEIL & OPTIMISATION IT",
    font: fontBold,
    fontPx: 10,
    color: manifest.colors.slate400,
    x: (DOC.widthPx / 2) - 120,
    y: (DOC.heightPx / 2) + 82,
    tracking: 250
  });

  addTextLayer(doc, logo, {
    name: "URL",
    contents: manifest.contact.website,
    font: fontMedium,
    fontPx: 11,
    color: manifest.colors.slate400,
    x: (DOC.widthPx / 2) - 50,
    y: DOC.heightPx - DOC.bleedPx - DOC.safePx - 30,
    tracking: 50
  });

  savePsd(doc, outputPath);
  savePreviewPng(doc, previewPath);
  doc.close(SaveOptions.DONOTSAVECHANGES);
}

try {
  buildRecto(manifest.paths.recto, manifest.paths.rectoPreview, false);
  buildRecto(manifest.paths.rectoAlt, manifest.paths.rectoAltPreview, true);
  buildVerso(manifest.paths.verso, manifest.paths.versoPreview);
} catch (e) {
  writeDebugLog("ERROR: " + formatError(e));
  var errorFile = new File(manifest.paths.outputDir + "/build-business-card-error.txt");
  errorFile.encoding = "UTF8";
  errorFile.open("w");
  errorFile.write(formatError(e));
  errorFile.close();
  throw e;
}
