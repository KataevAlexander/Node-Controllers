{% extends 'core/index.swig' %}

{% block body %}
  {#<script src="/js/vendor.js"></script>#}
  {#<script src="/js/app.js"></script>#}

  <div al-app="CoreController">
    <div al-repeat="item in items">
      {{ item }}
    </div>
  </div>

  index view template
{% endblock body %}