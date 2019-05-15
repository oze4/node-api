node {
    def app
    def dockerhub_container = "oze4/node-api"
    def local_container_name = "node-api"
    def docker_compose_path = "/srv/traefik/docker-compose/"

    stage('Clone Repository') {
        checkout scm
    }

    stage('Build Image') {
        app = docker.build("${dockerhub_container}")
    }

    stage('Test Image') {
        app.inside {
            withEnv([
                'npm_config_cache=npm-cache',
                'HOME=.',
                "MONGO_STRING=${MONGO_STRING}",
                "MONGO_AUTH_DB=${MONGO_AUTH_DB}",
                "JWT_SIGNATURE=${JWT_SIGNATURE}",
                "JWT_ENCRYPTION_KEY=${JWT_ENCRYPTION_KEY}"
                "PORT=${PORT}"
            ]) {
                sh 'npm install'
                sh 'cd '
                sh 'npm test'
                sh 'rm -R node_modules'
            }
        }
    }

    stage('Push Image To Docker Hub') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage ('SSH To Docker Host and Deploy') {
        sshagent(credentials : ['ost-sf-dckr-00']) {
            sh '''
ssh -v root@ost-sf-dckr-00 <<EOF
echo "--------------------------------"
echo "---- pulling latest image ------"
echo "--------------------------------"
docker pull '''+dockerhub_container+''':latest
echo "--------------------------------"
echo "--------------------------------"
echo "--- stopping existing image ----"
echo "--------------------------------"
docker stop '''+local_container_name+'''
echo "--------------------------------"
echo "--------------------------------"
echo "--- removing existing image ----"
echo "--------------------------------"
docker rm '''+local_container_name+'''
echo "--------------------------------"
echo "--------------------------------"
echo "------ starting new image ------"
echo "--------------------------------"
cd "'''+docker_compose_path+'''"
docker-compose up -d '''+local_container_name+'''
echo "--------------------------------"
echo "--------------------------------"
echo "----------- DONE ---------------"
echo "--------------------------------"
echo "--------------------------------"
EOF
'''
        }
    }
}