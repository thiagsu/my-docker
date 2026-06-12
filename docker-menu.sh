export DOCKER_MENU="\n
\n=======================
\n  Docker Menu
\n=======================
\n  1. Compose Up:
\n  2. Compose Down:
\n  3. Compose Build:
\n  4. Connect To Container:
\n  5. Connect To MySql Container:
\n  6. List Containers:
\n  7. My SQL Dump:
\n  0. Exit
\n=======================
"
SQL_CONT="my-docker-mysql-1"
MYSQL_DUMP_FILE="mysql_dump.sql"
MYSQL_DUMP_CMD="docker exec -i $SQL_CONT mysqldump -u root -p --all-databases > $MYSQL_DUMP_FILE"
showDockerMenu() {
  while true
  do
    echo -e $DOCKER_MENU
    read -p "Enter your choice: " choice

    case $choice in
        1)
            echo "Running docker-compose up..."
            docker-compose up -d
            ;;
        2)
            echo "Running docker-compose down..."
            docker-compose down -v
            ;;
        3)
            echo "Running docker-compose build..."
            cd ~/Workspace/my-docker/
            docker-compose build
            ;;
        4)
            read -p "Enter Container Name:(${SQL_CONT})  " containerName
            containerName=${containerName:-$SQL_CONT}

            echo "Connecting to container $containerName..."
            docker exec -it $containerName bash
            ;;
        5)
            read -p "Enter MySQL Container Name:(${SQL_CONT}) " containerName
            containerName=${containerName:-$SQL_CONT}

            echo "Connecting to MySQL container..."
            docker exec -it $containerName mysql -u root -p
            ;;
        6)
            echo "Listing all containers..."
            docker ps -a
            ;;
        7)
            read -p "Enter MySQL Container Name:(${SQL_CONT}) " containerName
            containerName=${containerName:-$SQL_CONT}

            read -p "Enter MySQL Container Name:(${MYSQL_DUMP_FILE}) " outFileName
            outFileName=${outFileName:-$MYSQL_DUMP_FILE}

            echo "Connecting to MySQL container..."
            docker exec -it $containerName mysqldump -u root -p --databases puzzle soccer -r $outFileName
            ;;
        0)
            echo "Exiting Docker Menu."
            break
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
  done
  }