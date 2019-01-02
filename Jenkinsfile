pipeline {
    agent { dockerfile: true }
    stages {
        stage('Lint') {
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Build') {
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