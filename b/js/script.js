(function(document) {
  document.addEventListener('DOMContentLoaded', function(e) {

    var toggle = document.querySelector('.sidebar-toggle');
    var sidebar = document.querySelector('#sidebar');
    var checkbox = document.querySelector('.sidebar-checkbox');

    document.addEventListener('click', function(e) {

      var target = e.target;

      if(!checkbox.checked ||
         sidebar.contains(target) ||
         (target === checkbox || target === toggle)) return;

      checkbox.checked = false;
    }, false);
  }, false);
})(document);
