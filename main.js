(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){var r,o,i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=function(){i._inputs.forEach((function(e){return i._addListenersToInput(e)})),i._form.addEventListener("input",(function(){return i._toggleButton()})),i._toggleButton()},(r="enableValidation")in this?Object.defineProperty(this,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[r]=o,this._params=e,this._form=n,this._button=this._form.querySelector(this._params.submitButtonSelector),this._inputs=Array.from(this._form.querySelectorAll(this._params.inputSelector))}var n,r;return n=t,(r=[{key:"_toggleButton",value:function(){this._isFormInvalid=!this._form.checkValidity(),this._button.disabled=this._isFormInvalid,this._button.classList.toggle(this._params.inactiveButtonClass,this._isFormInvalid)}},{key:"_handleFieldValidation",value:function(e){this._element=e.target,this._errorContainer=this._form.querySelector("#".concat(this._element.id,"-error")),this._element.classList.toggle(this._params.inputErrorClass,!this._element.validity.valid),this._errorContainer.textContent=this._element.validationMessage}},{key:"_addListenersToInput",value:function(e){var t=this;e.addEventListener("input",(function(e){return t._handleFieldValidation(e)}))}},{key:"_hideError",value:function(e){e.classList.remove(this._params.inputErrorClass),this._errorContainer=this._form.querySelector("#".concat(e.id,"-error")),this._errorContainer.textContent=null}},{key:"resetValidation",value:function(){var e=this;this._toggleButton(),this._inputs.forEach((function(t){return e._hideError(t)}))}}])&&e(n.prototype,r),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a,u,c,s){var l=s.handleCardClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t,this._link=n,this._likes=r,this._id=o,this._owner=i._id,this._templateSelector=a,this._handleCardClick=l,this._deletePopup=u,this._api=c,this._submitDeletePopup=document.querySelector(".popup_delete"),this._submitDeleteButton=this._submitDeletePopup.querySelector(".popup__submit-button")}var t,r;return t=e,(r=[{key:"_handleLike",value:function(){var e=this;this._likeButton.classList.contains("card__like-button_active")?this._api.deleteLike(this._id).then((function(t){e._likeButton.classList.remove("card__like-button_active"),e._likes=t.likes,e._likeText.textContent=e._likes.length})).catch((function(e){return console.log(e)})):this._api.addLike(this._id).then((function(t){e._likeButton.classList.add("card__like-button_active"),e._likes=t.likes,e._likeText.textContent=e._likes.length})).catch((function(e){return console.log(e)}))}},{key:"_handleDelete",value:function(){var e=this;this._api.deleteCard(this._id).then((function(){e._card.remove(),e._deletePopup.close()})).catch((function(e){return console.log(e)}))}},{key:"_submitDelete",value:function(){var e=this;this._deletePopup.open(),this._submitDeleteButton.addEventListener("click",(function(){e._handleDelete()}))}},{key:"_setListeners",value:function(){var e=this;this._likeButton.addEventListener("click",(function(){e._handleLike()})),this._deleteButton.addEventListener("click",(function(){e._submitDelete()})),this._cardImage.addEventListener("click",(function(){e._handleCardClick(e._name,e._link)}))}},{key:"createCard",value:function(){var e=this;return this._card=this._templateSelector.cloneNode(!0).children[0],this._cardImage=this._card.querySelector(".card__image"),this._cardText=this._card.querySelector(".card__text"),this._likeButton=this._card.querySelector(".card__like-button"),this._likeText=this._card.querySelector(".card__like-text"),this._deleteButton=this._card.querySelector(".card__delete-button"),this._cardText.textContent=this._name,this._cardImage.src=this._link,this._cardImage.alt=this._name,this._likeText.textContent=this._likes.length,this._api.getUserInfo().then((function(t){t._id===e._owner&&e._deleteButton.classList.add("card__delete-button_active")})).catch((function(e){return console.log(e)})),this._setListeners(),this._card}}])&&n(t.prototype,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n,r){var o=t.items,i=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=o,this._renderer=i,this._container=n,this._api=r}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.then((function(t){t.forEach((function(t){e._renderer(t.name,t.link,t.likes,t._id,t.owner)}))})).catch((function(e){return console.log(e)}))}},{key:"addItem",value:function(e,t){"append"===t?this._container.append(e):this._container.prepend(e)}}])&&o(t.prototype,n),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===e.currentTarget&&this.close()}},{key:"setEventListeners",value:function(){this._closeButton.addEventListener("click",this.close.bind(this)),this._popup.addEventListener("click",this._handleOverlayClose.bind(this))}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}])&&a(t.prototype,n),e}();function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=f(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function f(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function p(e,t){return p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},p(e,t)}function h(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._name=t._popup.querySelector(".popup__description"),t._image=t._popup.querySelector(".popup__image"),t}return t=a,(n=[{key:"open",value:function(e,t){this._name.textContent=e,this._image.src=t,this._image.alt=e,l(_(a.prototype),"open",this).call(this)}}])&&s(t.prototype,n),a}(u);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function k(e,t){return k=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},k(e,t)}function g(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&k(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e){var t,n=e.handleFormSubmit,r=e.popupSelector,o=e.api;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,r))._form=t._popup.querySelector(".popup__form"),t._handleFormSubmit=n,t._api=o,t._inputs=Array.from(t._form.querySelectorAll(".popup__input")),t._submitButton=t._form.querySelector(".popup__submit-button"),t}return t=a,(n=[{key:"_getInputValues",value:function(){var e={};return this._inputs.forEach((function(t){e[t.name]=t.value})),e}},{key:"_handleSubmit",value:function(e){e.preventDefault(),this._submitButton.textContent="Сохранение...",this._handleFormSubmit(this._getInputValues())}},{key:"setEventListeners",value:function(){v(S(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._handleSubmit.bind(this))}},{key:"close",value:function(){v(S(a.prototype),"close",this).call(this),this._form.reset()}}])&&m(t.prototype,n),a}(u);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function C(e,t){return C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},C(e,t)}function O(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}(o,e);var t,n,r=(t=o,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=j(t);if(n){var o=j(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return O(this,e)});function o(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),r.call(this,e)}return o}(u);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t){var n=t.name,r=t.text,o=t.avatar,i=t.api;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._text=document.querySelector(r),this._avatar=document.querySelector(o),this._api=i}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){var e=this;this._api.getUserInfo().then((function(t){e._name.textContent=t.name,e._text.textContent=t.about,e._avatar.src=t.avatar})).catch((function(e){return console.log(e)}))}},{key:"setPopupUserInfo",value:function(e,t){this._api.getUserInfo().then((function(n){e.value=n.name,t.value=n.about})).catch((function(e){return console.log(e)}))}},{key:"setUserInfo",value:function(e){var t=this,n=e.name,r=e.text;this._api.setUserInfo(n,r).then((function(e){t._name.textContent=e.name,t._text.textContent=e.about})).catch((function(e){return console.log(e)}))}},{key:"setAvatar",value:function(e){var t=this;this._api.setAvatar(e).then((function(e){t._avatar.src=e.avatar})).catch((function(e){return console.log(e)}))}}])&&L(t.prototype,n),e}();function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{method:"GET",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{method:"GET",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserInfo",value:function(e,t,n){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t,avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&x(t.prototype,n),e}(),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error"},B=document.querySelector(".profile__edit-button"),R=document.querySelector(".profile__add-button"),U=document.querySelector(".profile__avatar-button"),D=document.querySelector(".popup_profile"),V=document.querySelector(".popup_card"),F=document.querySelector(".popup_avatar"),A=D.querySelector(".popup__input_field_name"),N=D.querySelector(".popup__input_field_text"),J=D.querySelector(".popup__form"),G=V.querySelector(".popup__form"),H=F.querySelector(".popup__form"),z=D.querySelector(".popup__submit-button"),M=V.querySelector(".popup__submit-button"),K=F.querySelector(".popup__submit-button"),Q=document.querySelector(".card_template").content,W=document.querySelector(".cards__list"),X=new t(I,J),Y=new t(I,G),Z=new t(I,H),$=new T({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-33",headers:{authorization:"f7bab5a6-9ad0-4af8-99cf-913958ad451d","Content-Type":"application/json"}}),ee=new q({name:".profile__title",text:".profile__subtitle",avatar:".profile__image",api:$}),te=new w({handleFormSubmit:function(e){ee.setUserInfo(e),te.close(),z.textContent="Сохранить"},popupSelector:".popup_profile"}),ne=new w({handleFormSubmit:function(e){ee.setAvatar(e.avatar),ne.close(),K.textContent="Сохранить"},popupSelector:".popup_avatar"}),re=new w({handleFormSubmit:function(e){var t=e.title,n=e.link;$.addCard(t,n).then((function(e){var t=ue(e.name,e.link,e.likes,e._id,e.owner);ae.addItem(t,"prepend"),re.close(),M.textContent="Создать"})).catch((function(e){return console.log(e)}))},popupSelector:".popup_card",api:$}),oe=new d(".popup_photo"),ie=new P(".popup_delete"),ae=new i({items:$.getInitialCards(),renderer:function(e,t,n,r,o){var i=ue(e,t,n,r,o);ae.addItem(i,"append")}},W,$);function ue(e,t,n,o,i){return new r(e,t,n,o,i,Q,ie,$,{handleCardClick:function(e,t){oe.open(e,t)}}).createCard()}B.addEventListener("click",(function(){ee.setPopupUserInfo(A,N),X.resetValidation(),te.open()})),R.addEventListener("click",(function(){Y.resetValidation(),re.open()})),U.addEventListener("click",(function(){Z.resetValidation(),ne.open()})),X.enableValidation(),Y.enableValidation(),Z.enableValidation(),te.setEventListeners(),oe.setEventListeners(),re.setEventListeners(),ie.setEventListeners(),ne.setEventListeners(),ae.renderItems(),ee.getUserInfo()})();