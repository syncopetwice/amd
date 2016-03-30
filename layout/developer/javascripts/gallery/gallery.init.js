(function($){
  $(function(){

    // Preloader
    var $preloader = $("#js-preloader");
    // Controls
    var $controls = $("#js-controls");
    // Galleries wrapper
    $gallery = $("#js-gallery");

    // Gallery functions
    function showGallery(type) {
      $gallery.find("[data-gallery=" + type + "]").addClass("isVisible").siblings().removeClass("isVisible");
    }

    function removeGallery(type) {
      $gallery.find("[data-gallery=" + type + "]").removeClass("isVisible");
    }

    // Events
    $controls.find('a').on('click', function(event) {

      event.preventDefault();

      var galleryType = $(event.target).data("type");

      // First Click
      if ( !$(this).hasClass("isActive") && !$controls.hasClass("isOpen") ) {
        $(this).addClass("isActive").siblings().removeClass("isActive");
        $controls.addClass("isOpen");
        showGallery(galleryType);
      // Double click on the same tab
      } else if ( $(this).hasClass("isActive") && $controls.hasClass("isOpen") ) {
        $(this).removeClass("isActive");
        $controls.removeClass("isOpen");
        removeGallery(galleryType);
      // Click on other tabs while some tab is active
      } else {
        $(this).addClass("isActive").siblings().removeClass("isActive");
        showGallery(galleryType);
      }
    })

    $gallery.imagesLoaded()
      .always( function() {
        $preloader.hide();
      });
  });
}(jQuery));