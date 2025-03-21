def GitCheckout(){
      git branch: 'main', 
      credentialsId: 'github-credentials', 
      url: 'https://github.com/hashanCB/TubeAnalyzer'
}

return this