pipeline {
    agent { label 'ubuntu-latest' }

    stages {
        stage('Checkout code') {
            steps {
                git branch: 'dev', url: 'https://github.com/squad4-poloit/FrontEnd-PoloIT'
            }
        }

        stage('Set up Node.js') {
            steps {
                sh 'curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -'
                sh 'sudo apt-get install -y nodejs'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Biome format check') {
            steps {
                sh 'npx @biomejs/biome format ./src'
            }
        }

        stage('Run Biome lint check') {
            steps {
                sh 'npx @biomejs/biome lint ./src'
            }
        }

        stage('Auto-fix issues') {
            steps {
                sh '''
                    npx @biomejs/biome format --write ./src
                    npx @biomejs/biome lint --write ./src
                '''
            }
        }

        stage('Check for changes') {
            steps {
                script {
                    def changes = sh(script: 'git diff --exit-code || echo "changed=true"', returnStdout: true).trim()
                    if (changes.contains("changed=true")) {
                        env.CHANGED = 'true'
                    } else {
                        env.CHANGED = 'false'
                    }
                }
            }
        }

        stage('Commit auto-fixes') {
            when {
                expression { env.CHANGED == 'true' }
            }
            steps {
                sh '''
                    git config user.name "jenkins"
                    git config user.email "jenkins@domain.com"
                    git add .
                    git commit -m "fix: auto-fix lint and formatting issues"
                '''
            }
        }

        stage('Fail if issues remain') {
            when {
                expression { env.CHANGED == 'true' }
            }
            steps {
                error("Linting and formatting issues remain.")
            }
        }
    }
}
