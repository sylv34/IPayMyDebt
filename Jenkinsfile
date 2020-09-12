pipeline {
   agent any

   tools {nodejs "node"}
   
   stages {
    stage('Build') {
       steps {
          git 'https://gitlab.com/sylvain.dienst/family-back.git'
          sh "npm install --production"
          sh "npm run build"
       }
    }
    // stage('SonarQube analysis') {
    //   steps {
    //     withSonarQubeEnv('default') {
    //       sh 'mvn clean package sonar:sonar'
    //     }
    //   }
    // }
    stage('Deliver') {
        steps {
            sh './deploy.sh'
        }
    }
  }
}