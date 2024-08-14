
# # Print the current working directory
# pwd

# # List files in the current directory
# ls -la

# Ensure environment variables are sourced
source ./.env


pip install -r requirements.txt
python manage.py collectstatic --noinput