pipeline {
    agent any

    stages {
        stage('Backend Test') {
            environment {
                OPENAI_API_KEY = 'test-key'
            }
            steps {
                dir('backend') {
                    sh 'uv sync'
                    sh 'uv run pytest -v'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t llm-backend:${BUILD_NUMBER} backend'
                sh 'docker build -t llm-frontend:${BUILD_NUMBER} frontend'
            }
        }
    }
}
