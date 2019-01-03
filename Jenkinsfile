pipeline {
    agent none
    stages {
        stage('Lint') {
            agent {
                docker { 
                    image 'node:lts-alpine' 
                    args '-u root:root'
                }
            }   
            steps {
                sh 'apk add --no-cache --virtual .gyp python make g++'
                sh 'npm install'
                sh 'apk del .gyp'
            }
        }
        stage('Build') {
            agent {
                docker { image 'node:lts-alpine' }
            }
            steps {
                sh 'npm run build-ts '
            }
        }
        stage('Build Docker Image') {
            agent {
                label 'master'
            }
            steps {
                sh "docker-build-and-push -b ${BRANCH_NAME}"
                sh "echo ${BRANCH_NAME}"
            }
        }
    }
}