
def gv
pipeline {
    agent any



    stages{
        stages('init'){
            steps{
                script{
                    gv = load "script.groovy"
                }
            }
        }
        stage("Checkout"){
            steps{
                script{
                  gv.GitCheckout()
                }
            }
        }
    }

}