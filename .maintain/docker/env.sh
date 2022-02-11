TARGET=./env-config.js

# Recreate config file
echo -n > $TARGET

declare -a vars=(
  "REACT_APP_MYRIAD_WEBSITE_URL"
  "REACT_APP_MYRIAD_SUPPORT_MAIL"
  "REACT_APP_MYRIAD_WEB_URL"
  "REACT_APP_MYRIAD_API_URL"
  "REACT_APP_MYRIAD_API_KEY"
  "REACT_APP_MYRIAD_ADMIN_EMAIL"
  "REACT_APP_MYRIAD_ADMIN_PASSWORD"
)

echo "window.process_env = {" >> $TARGET
for VAR in ${vars[@]}; do
  echo "  $VAR: \"${!VAR}\"," >> $TARGET
done
echo "}" >> $TARGET
