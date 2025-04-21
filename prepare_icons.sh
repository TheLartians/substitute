
if [ ! -f public/favicon.ico ]; then
  ICON=$(pwd)/resources/export/icon.svg
  magick -density 384 ${ICON} -background none -define icon:auto-resize public/favicon.ico
  magick -density 512x512 ${ICON} -background none -resize 512x512 public/logo512.png
  magick -density 512x512 ${ICON} -background none -resize 192x192 public/logo192.png
  magick -density 512x512 ${ICON} -resize 1200x627 -background white public/preview.jpg
fi
