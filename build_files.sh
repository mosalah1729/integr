
# # Print the current working directory
# pwd

# # List files in the current directory
# ls -la

# Ensure environment variables are sourced
source ./.env


pip install -r requirements.txt
yes | python3.9 manage.py collectstatic