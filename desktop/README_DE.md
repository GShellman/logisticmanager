# Windows-EXE bauen

Diese Desktop-Version startet `Helvetic_Freight_v1.1.38_CleanApp.html` in einem eigenen Electron-Fenster statt in einem normalen Browser-Tab.

## Spielstand

Der Spielstand liegt nicht im Browserprofil. Electron verwendet das app-eigene Profil `persist:helvetic-freight-clean` und speichert unter Windows im Benutzerordner, typischerweise unter:

`%APPDATA%\\Helvetic Freight Clean`

Dadurch bleibt der Save unabhängig von Chrome, Edge, Firefox oder deren Browserdaten.

## Entwicklung starten

```bash
npm install
npm start
```

## Portable EXE bauen

```bash
npm install
npm run build:win
```

Die portable EXE wird anschließend im Ordner `dist/` erzeugt.

## Installer bauen

```bash
npm install
npm run build:win-installer
```

Der Installer wird anschließend ebenfalls im Ordner `dist/` erzeugt.
