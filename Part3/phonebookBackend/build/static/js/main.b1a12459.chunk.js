(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){e.exports=n(38)},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(15),c=n.n(o),l=n(4),u=n(2),m=n(3),s=n.n(m),i="/api/persons",d=function(){return s.a.get(i).then((function(e){return e.data}))},b=function(e){return s.a.post(i,e).then((function(e){return e.data}))},f=function(e){return s.a.delete("".concat(i,"/").concat(e)).then((function(e){return e.data}))},h=function(e,t){return s.a.put("".concat(i,"/").concat(e),t).then((function(e){return e.data}))},E=function(e){var t=e.message,n=e.colorClass;return null===t?null:r.a.createElement("div",{className:n},t)},p=function(e){var t=e.persons,n=e.setPersonToDelete,a=e.deletePerson;return t.map((function(e){return r.a.createElement("form",{key:e.id,onSubmit:a},r.a.createElement("div",{className:"nameStyle",key:e.name},[r.a.createElement("b",{key:e.name},"Name: "),e.name]," ",[r.a.createElement("b",{key:e.number},"  number: "),e.number],r.a.createElement("button",{className:"button",type:"submit",onClick:function(){n(t.find((function(t){return t.name.toLowerCase()===e.name.toLowerCase()})))}},"delete")))}))},v=function(e){var t=e.filterChange;return r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null," ",r.a.createElement("b",null,"Filter show with: ")," "),r.a.createElement("td",null,r.a.createElement("input",{onChange:t})," ")))},w=function(e){var t=e.addPerson,n=e.newName,a=e.nameChange,o=e.newNumber,c=e.numberChange;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{className:"labelStyle"},"Name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",{className:"labelStyle"},"Number: ",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{className:"button",type:"submit"},"add")))},N=(n(14),function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)([]),m=Object(u.a)(c,2),s=m[0],i=m[1],N=Object(a.useState)(""),g=Object(u.a)(N,2),C=g[0],y=g[1],S=Object(a.useState)(""),j=Object(u.a)(S,2),O=j[0],k=j[1],P=Object(a.useState)(""),L=Object(u.a)(P,2),D=L[0],A=L[1],T=Object(a.useState)(""),I=Object(u.a)(T,2),J=I[0],x=I[1],B=Object(a.useState)(""),F=Object(u.a)(B,2),R=F[0],Y=F[1];Object(a.useEffect)((function(){d().then((function(e){i(e)}))}),[]);var q=function(e){y(e.target.value)},z=function(e){k(e.target.value)},G=function(e){A(e.target.value)},H=function(e,t){x(e),Y(t),setTimeout((function(){x(null)}),5e3)},K=function(e){(e.preventDefault(),s.map((function(e){return e.name.toLowerCase()})).includes(C.toLowerCase()))?(window.confirm("".concat(C," is already added to phonebook, replace the old number with a new one?"))&&M(C),y(""),k("")):b({name:C,number:O}).then((function(e){i(s.concat(e)),H("Added ".concat(C," to phonebook"),"nameAdded"),y(""),k("")})).catch((function(e){H(e.response.data.error,"error"),console.log(e.response.data.error)}))},M=function(e){var t=s.find((function(t){return t.name.toLowerCase()===e.toLowerCase()})),n=Object(l.a)(Object(l.a)({},t),{},{number:O});h(n.id,n).then((function(e){i(s.map((function(t){return t.id!==n.id?t:e}))),H("Number of ".concat(t.name," has been changed"),"numberChanged")})).catch((function(e){H(e.response.data.error,"error"),console.log(e.response.data.error)}))};return 0===s.length?r.a.createElement("div",null,r.a.createElement("h2",{className:"headerStyle"},"Phonebook"),r.a.createElement(E,{message:J,colorClass:R}),r.a.createElement("table",{className:"labelStyle"},r.a.createElement(v,{filterChange:G})),r.a.createElement("h2",{className:"headerStyle"},"Add a new contact"),r.a.createElement(w,{addPerson:K,newName:C,nameChange:q,newNumber:O,numberChange:z}),r.a.createElement("h2",{className:"headerStyle"},"Numbers"),r.a.createElement("h3",{className:"headerStyle"},"You have no contacts to show")):r.a.createElement("div",null,r.a.createElement("h2",{className:"headerStyle"},"Phonebook"),r.a.createElement(E,{message:J,colorClass:R}),r.a.createElement("table",{className:"labelStyle"},r.a.createElement(v,{filterChange:G})),r.a.createElement("h2",{className:"headerStyle"},"Add a new contact"),r.a.createElement(w,{addPerson:K,newName:C,nameChange:q,newNumber:O,numberChange:z}),r.a.createElement("h2",{className:"headerStyle"},"Numbers"),r.a.createElement(p,{persons:s.filter((function(e){return e.name.toLowerCase().includes(D.toLowerCase())})),personToDelete:n,setPersonToDelete:o,deletePerson:function(e){e.preventDefault(),window.confirm("Delete ".concat(n.name,"?"))&&f(n.id).then((function(){i(s.filter((function(e){return e.name!==n.name}))),H("".concat(n.name," has been removed"),"nameRemoved")})).catch((function(){i(s.filter((function(e){return e.name!==n.name}))),H("Information of ".concat(n.name," has already been removed from server"),"error")}))}}))});c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.b1a12459.chunk.js.map