pipeline {
    agent none
    stages {
        stage('Lint') {
            agent {
                docker { 
                    image 'obraun/node-jenkins:latest' 
                    args '-u root:root'
                }
            }   
            steps {
                sh 'echo hello world'
            }
        }
        stage('Build') {
            agent {
                docker { image 'obraun/node-jenkins:latest' }
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
            }
        }
    }
}