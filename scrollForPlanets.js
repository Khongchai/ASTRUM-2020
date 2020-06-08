window.addEventListener('scroll', () => {
    const planetObj = document.querySelectorAll(".planetsDecorContainer");

    var scrollObjLength = planetObj.length;
    var i = 0;
    for (i = 0; i < scrollObjLength; i++)
   {
      var posYshift = window.pageYOffset * planetObj[i].dataset.rate;
      planetObj[i].style.transform = 'translate3d(0px, -'+posYshift+'px, 0px)';
      
    }

  });


  //for stars background
  window.addEventListener('scroll', () => {
    const planetObj = document.querySelectorAll(".starsContainer");

    var scrollObjLength = planetObj.length;
    var i = 0;
    for (i = 0; i < scrollObjLength; i++)
   {
      var posYshift = window.pageYOffset * planetObj[i].dataset.rate;
      planetObj[i].style.transform = 'translate3d(-'+posYshift+'px , -'+posYshift+'px, 0)';
      
    }

  });