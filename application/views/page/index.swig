{% extends 'common/common.swig' %}

{% block body %}

  <div al-app="CommonController">
    <div al-repeat="item in items">
      {{ item }}
    </div>
  </div>

  index view template
{% endblock body %}