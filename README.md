**Please make sure you have docker-compose in your machine, if you're using a windows machine, it should be shipped with docker desktop**
**Please cd into the project folder and then :**

- run "docker compose up -d" (-d for detashed mode!).
- "docker compose ps" to check for containers running status.
- "docker compose logs" to check containers log.

> both of the front-end and back-end are bindmounted into their containers, you should be able to change the code and see it changing inside its corresponding container.

> each task should be done within its specific branch. eg: "git switch -C member-name/task-name"
