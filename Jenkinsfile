pipeline {
   agent any
   
   environment {
     // You must set the following environment variables
     // ORGANIZATION_NAME
     // YOUR_DOCKERHUB_USERNAME (it doesn't matter if you don't have one)
     SERVICE_NAME = "orders"
     REPOSITORY_TAG="${YOUR_DOCKERHUB_USERNAME}/${ORGANIZATION_NAME}-${SERVICE_NAME}:${BUILD_ID}"
   }

   stages {
      stage('Preparation') {
         steps {
            cleanWs()
            git credentialsId: 'GitHub', url: "https://github.com/${ORGANIZATION_NAME}/${SERVICE_NAME}", branch: env.BRANCH_NAME
         }
      }

      stage('Build') {
         steps {
            sh 'npm install'
         }
      }

      stage('Build and Push Image') {
         steps {
           sh 'docker image build -t ${REPOSITORY_TAG} .'
         }
      }

      stage('Deploy to Cluster') {
          steps {
            sh 'helm install ${SERVICE_NAME} ${WORKSPACE}/${SERVICE_NAME}-helm --set ${SERVICE_NAME}.image=${REPOSITORY_TAG} --set mongodb.auth.rootPassword="aaaa"'
          }
      }
   }
}
