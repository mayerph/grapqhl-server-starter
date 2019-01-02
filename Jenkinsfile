pipeline {
    agent none
    stages {
        stage('Lint') {
            agent {
                docker { image 'node:lts-alpine' }
            }   
            steps {
                sh 'apk add --no-cache make gcc g++ python'
                sh 'npm install'
                sh 'apk del make gcc g++ python'
                sh 'npm run lint'
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
            }
        }
    }
}