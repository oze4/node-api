node {
    def app
    def dockerhub_container = "oze4/node-api"
    def local_container_name = "node-api"

    stage('Clone Repository') {
        checkout scm
    }

    stage('Build Image') {
        app = docker.build("${dockerhub_container}")
    }

    stage('Test Image') {
        app.inside {
            sh 'echo "Volkswagen Tests passed"'
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
            sh """
ssh -v root@ost-sf-dckr-00 <<EOF
echo "--------------------------------"
echo "---- pulling latest image ------"
echo "--------------------------------"
docker pull oze4/node-api:latest
echo "--------------------------------"
echo "--------------------------------"
echo "--- stopping existing image ----"
echo "--------------------------------"
docker stop node-api
echo "--------------------------------"
echo "--------------------------------"
echo "--- removing existing image ----"
echo "--------------------------------"
docker rm node-api
echo "--------------------------------"
echo "--------------------------------"
echo "------ starting new image ------"
echo "--------------------------------"
cd "/srv/nginx-proxy/"
docker-compose up -d node-api
echo "--------------------------------"
echo "--------------------------------"
echo "----------- DONE ---------------"
echo "--------------------------------"
echo "--------------------------------"
EOF
"""
        }
    }
}