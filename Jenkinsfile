pipeline {
    agent none
    stages {
        stage('Lint') {
            agent {
                dockerfile: true
            }   
            steps {
                sh 'npm install'
                sh 'npm run lint'
            }
        }
        stage('Build') {
            agent {
                dockerfile: true
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