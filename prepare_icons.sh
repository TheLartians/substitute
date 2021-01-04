
if [ ! -f public/favicon.ico ]; then
  ICON=$(pwd)/resources/export/icon.svg
  echo "generating icons from ${ICON}"
  convert -density 384 -background none ${ICON} -define icon:auto-resize public/favicon.ico
  convert -density 512x512 -background none -resize 512x512 ${ICON} public/logo512.png
  convert -density 512x512 -background none -resize 192x192 ${ICON} public/logo192.png
  convert -density 512x512 -resize 1200x627 -background white ${ICON} public/preview.jpg
fi
