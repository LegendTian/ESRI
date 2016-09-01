// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
define("esri/layers/rasterFormats/Jpg",[],function(){return function(){function P(){}function Q(b,d){for(var n=0,k=[],a,v,w=16;0<w&&!b[w-1];)w--;k.push({children:[],index:0});var c=k[0],l;for(a=0;a<w;a++){for(v=0;v<b[a];v++){c=k.pop();for(c.children[c.index]=d[n];0<c.index;)c=k.pop();c.index++;for(k.push(c);k.length<=a;)k.push(l={children:[],index:0}),c.children[c.index]=l.children,c=l;n++}a+1<w&&(k.push(l={children:[],index:0}),c.children[c.index]=l.children,c=l)}return k[0].children}function R(b,
d,n,k,a,v,w,c,l){function h(){if(0<z)return z--,A>>z&1;A=b[d++];if(255===A){var a=b[d++];if(a)throw"unexpected marker: "+(A<<8|a).toString(16);}z=7;return A>>>7}function s(a){for(;;){a=a[h()];if("number"===typeof a)return a;if("object"!==typeof a)throw"invalid huffman sequence";}}function x(a){for(var b=0;0<a;)b=b<<1|h(),a--;return b}function g(a){if(1===a)return 1===h()?1:-1;var b=x(a);return b>=1<<a-1?b:b+(-1<<a)+1}function e(a,b){var c=s(a.huffmanTableDC),c=0===c?0:g(c);a.blockData[b]=a.pred+=
c;for(c=1;64>c;){var d=s(a.huffmanTableAC),e=d&15,d=d>>4;if(0===e){if(15>d)break;c+=16}else c+=d,a.blockData[b+L[c]]=g(e),c++}}function t(a,b){var c=s(a.huffmanTableDC),c=0===c?0:g(c)<<l;a.blockData[b]=a.pred+=c}function u(a,b){a.blockData[b]|=h()<<l}function m(a,b){if(0<y)y--;else for(var c=v,d=w;c<=d;){var e=s(a.huffmanTableAC),f=e&15,e=e>>4;if(0===f){if(15>e){y=x(e)+(1<<e)-1;break}c+=16}else c+=e,a.blockData[b+L[c]]=g(f)*(1<<l),c++}}function r(a,b){for(var c=v,e=w,d=0,f;c<=e;){f=L[c];switch(q){case 0:d=
s(a.huffmanTableAC);f=d&15;d>>=4;if(0===f)15>d?(y=x(d)+(1<<d),q=4):(d=16,q=1);else{if(1!==f)throw"invalid ACn encoding";C=g(f);q=d?2:3}continue;case 1:case 2:a.blockData[b+f]?a.blockData[b+f]+=h()<<l:(d--,0===d&&(q=2===q?3:0));break;case 3:a.blockData[b+f]?a.blockData[b+f]+=h()<<l:(a.blockData[b+f]=C<<l,q=0);break;case 4:a.blockData[b+f]&&(a.blockData[b+f]+=h()<<l)}c++}4===q&&(y--,0===y&&(q=0))}var p=n.mcusPerLine,f=d,A=0,z=0,y=0,q=0,C,D=k.length,B,G,E,F,K;c=n.progressive?0===v?0===c?t:u:0===c?m:
r:e;var H=0;n=1===D?k[0].blocksPerLine*k[0].blocksPerColumn:p*n.mcusPerColumn;a||(a=n);for(var I,J;H<n;){for(G=0;G<D;G++)k[G].pred=0;y=0;if(1===D){B=k[0];for(K=0;K<a;K++)c(B,64*((B.blocksPerLine+1)*(H/B.blocksPerLine|0)+H%B.blocksPerLine)),H++}else for(K=0;K<a;K++){for(G=0;G<D;G++){B=k[G];I=B.h;J=B.v;for(E=0;E<J;E++)for(F=0;F<I;F++)c(B,64*((B.blocksPerLine+1)*((H/p|0)*B.v+E)+(H%p*B.h+F)))}H++}z=0;B=b[d]<<8|b[d+1];if(65280>=B)throw"marker was not found";if(65488<=B&&65495>=B)d+=2;else break}return d-
f}function S(b,d){for(var n=d.blocksPerLine,k=d.blocksPerColumn,a=new Int16Array(64),v=0;v<k;v++)for(var w=0;w<n;w++){for(var c=64*((d.blocksPerLine+1)*v+w),l=a,h=d.quantizationTable,s=d.blockData,x=void 0,g=void 0,e=void 0,t=void 0,u=void 0,m=void 0,r=void 0,p=void 0,f=void 0,A=p=void 0,z=r=g=m=void 0,y=void 0,f=void 0,q=0;64>q;q+=8)f=s[c+q],p=s[c+q+1],A=s[c+q+2],m=s[c+q+3],g=s[c+q+4],r=s[c+q+5],z=s[c+q+6],y=s[c+q+7],f*=h[q],0===(p|A|m|g|r|z|y)?(f=D*f+512>>10,l[q]=f,l[q+1]=f,l[q+2]=f,l[q+3]=f,l[q+
4]=f,l[q+5]=f,l[q+6]=f,l[q+7]=f):(p*=h[q+1],A*=h[q+2],m*=h[q+3],g*=h[q+4],r*=h[q+5],z*=h[q+6],y*=h[q+7],x=D*f+128>>8,g=D*g+128>>8,e=A,t=z,u=E*(p-y)+128>>8,p=E*(p+y)+128>>8,m<<=4,r<<=4,x=x+g+1>>1,g=x-g,f=e*F+t*I+128>>8,e=e*I-t*F+128>>8,t=f,u=u+r+1>>1,r=u-r,p=p+m+1>>1,m=p-m,x=x+t+1>>1,t=x-t,g=g+e+1>>1,e=g-e,f=u*J+p*M+2048>>12,u=u*M-p*J+2048>>12,p=f,f=m*N+r*O+2048>>12,m=m*O-r*N+2048>>12,r=f,l[q]=x+p,l[q+7]=x-p,l[q+1]=g+r,l[q+6]=g-r,l[q+2]=e+m,l[q+5]=e-m,l[q+3]=t+u,l[q+4]=t-u);for(h=0;8>h;++h)f=l[h],
p=l[h+8],A=l[h+16],m=l[h+24],g=l[h+32],r=l[h+40],z=l[h+48],y=l[h+56],0===(p|A|m|g|r|z|y)?(f=D*f+8192>>14,f=-2040>f?0:2024<=f?255:f+2056>>4,s[c+h]=f,s[c+h+8]=f,s[c+h+16]=f,s[c+h+24]=f,s[c+h+32]=f,s[c+h+40]=f,s[c+h+48]=f,s[c+h+56]=f):(x=D*f+2048>>12,g=D*g+2048>>12,e=A,t=z,u=E*(p-y)+2048>>12,p=E*(p+y)+2048>>12,x=(x+g+1>>1)+4112,g=x-g,f=e*F+t*I+2048>>12,e=e*I-t*F+2048>>12,t=f,u=u+r+1>>1,r=u-r,p=p+m+1>>1,m=p-m,x=x+t+1>>1,t=x-t,g=g+e+1>>1,e=g-e,f=u*J+p*M+2048>>12,u=u*M-p*J+2048>>12,p=f,f=m*N+r*O+2048>>
12,m=m*O-r*N+2048>>12,r=f,f=x+p,y=x-p,p=g+r,z=g-r,A=e+m,r=e-m,m=t+u,g=t-u,f=16>f?0:4080<=f?255:f>>4,p=16>p?0:4080<=p?255:p>>4,A=16>A?0:4080<=A?255:A>>4,m=16>m?0:4080<=m?255:m>>4,g=16>g?0:4080<=g?255:g>>4,r=16>r?0:4080<=r?255:r>>4,z=16>z?0:4080<=z?255:z>>4,y=16>y?0:4080<=y?255:y>>4,s[c+h]=f,s[c+h+8]=p,s[c+h+16]=A,s[c+h+24]=m,s[c+h+32]=g,s[c+h+40]=r,s[c+h+48]=z,s[c+h+56]=y)}return d.blockData}function C(b){return 0>=b?0:255<=b?255:b}var L=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,
26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),O=4017,N=799,M=3406,J=2276,I=1567,F=3784,D=5793,E=2896;P.prototype={parse:function(b){function d(){var c=b[a]<<8|b[a+1];a+=2;return c}function n(){var c=d(),c=b.subarray(a,a+c-2);a+=c.length;return c}function k(a){for(var b=Math.ceil(a.samplesPerLine/8/a.maxH),c=Math.ceil(a.scanLines/8/a.maxV),d=0;d<a.components.length;d++){f=a.components[d];var e=Math.ceil(Math.ceil(a.samplesPerLine/
8)*f.h/a.maxH),g=Math.ceil(Math.ceil(a.scanLines/8)*f.v/a.maxV);f.blockData=new Int16Array(64*(c*f.v)*(b*f.h+1));f.blocksPerLine=e;f.blocksPerColumn=g}a.mcusPerLine=b;a.mcusPerColumn=c}var a=0,v=null,w=null,c,l,h=[],s=[],x=[],g=d();if(65496!==g)throw"SOI not found";for(g=d();65497!==g;){var e,t;switch(g){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:e=n();65504===
g&&74===e[0]&&(70===e[1]&&73===e[2]&&70===e[3]&&0===e[4])&&(v={version:{major:e[5],minor:e[6]},densityUnits:e[7],xDensity:e[8]<<8|e[9],yDensity:e[10]<<8|e[11],thumbWidth:e[12],thumbHeight:e[13],thumbData:e.subarray(14,14+3*e[12]*e[13])});65518===g&&65===e[0]&&(100===e[1]&&111===e[2]&&98===e[3]&&101===e[4])&&(w={version:e[5]<<8|e[6],flags0:e[7]<<8|e[8],flags1:e[9]<<8|e[10],transformCode:e[11]});break;case 65499:for(var g=d()+a-2,u;a<g;){var m=b[a++],r=new Uint16Array(64);if(0===m>>4)for(e=0;64>e;e++)u=
L[e],r[u]=b[a++];else if(1===m>>4)for(e=0;64>e;e++)u=L[e],r[u]=d();else throw"DQT: invalid table spec";h[m&15]=r}break;case 65472:case 65473:case 65474:if(c)throw"Only single frame JPEGs supported";d();c={};c.extended=65473===g;c.progressive=65474===g;c.precision=b[a++];c.scanLines=d();c.samplesPerLine=d();c.components=[];c.componentIds={};e=b[a++];for(g=r=m=0;g<e;g++){u=b[a];t=b[a+1]>>4;var p=b[a+1]&15;m<t&&(m=t);r<p&&(r=p);t=c.components.push({h:t,v:p,quantizationTable:h[b[a+2]]});c.componentIds[u]=
t-1;a+=3}c.maxH=m;c.maxV=r;k(c);break;case 65476:u=d();for(g=2;g<u;){m=b[a++];r=new Uint8Array(16);for(e=t=0;16>e;e++,a++)t+=r[e]=b[a];p=new Uint8Array(t);for(e=0;e<t;e++,a++)p[e]=b[a];g+=17+t;(0===m>>4?x:s)[m&15]=Q(r,p)}break;case 65501:d();l=d();break;case 65498:d();u=b[a++];e=[];for(var f,g=0;g<u;g++)m=c.componentIds[b[a++]],f=c.components[m],m=b[a++],f.huffmanTableDC=x[m>>4],f.huffmanTableAC=s[m&15],e.push(f);g=b[a++];u=b[a++];m=b[a++];g=R(b,a,c,e,l,g,u,m>>4,m&15);a+=g;break;case 65535:255!==
b[a]&&a--;break;default:if(255===b[a-3]&&192<=b[a-2]&&254>=b[a-2]){a-=3;break}throw"unknown JPEG marker "+g.toString(16);}g=d()}this.width=c.samplesPerLine;this.height=c.scanLines;this.jfif=v;this.eof=a;this.adobe=w;this.components=[];for(g=0;g<c.components.length;g++)f=c.components[g],this.components.push({output:S(c,f),scaleX:f.h/c.maxH,scaleY:f.v/c.maxV,blocksPerLine:f.blocksPerLine,blocksPerColumn:f.blocksPerColumn});this.numComponents=this.components.length},_getLinearizedBlockData:function(b,
d){var n=this.width/b,k=this.height/d,a,v,w,c,l,h,s=0,x,g=this.components.length,e=b*d*g,t=new Uint8Array(e),u=new Uint32Array(b);for(h=0;h<g;h++){a=this.components[h];v=a.scaleX*n;w=a.scaleY*k;s=h;x=a.output;c=a.blocksPerLine+1<<3;for(l=0;l<b;l++)a=0|l*v,u[l]=(a&4294967288)<<3|a&7;for(v=0;v<d;v++){a=0|v*w;a=c*(a&4294967288)|(a&7)<<3;for(l=0;l<b;l++)t[s]=x[a+u[l]],s+=g}}if(k=this.decodeTransform)for(h=0;h<e;)for(n=a=0;a<g;a++,h++,n+=2)t[h]=(t[h]*k[n]>>8)+k[n+1];return t},_isColorConversionNeeded:function(){return this.adobe&&
this.adobe.transformCode?!0:3===this.numComponents?!0:!1},_convertYccToRgb:function(b){for(var d,n,k,a=0,v=b.length;a<v;a+=3)d=b[a],n=b[a+1],k=b[a+2],b[a]=C(d-179.456+1.402*k),b[a+1]=C(d+135.459-0.344*n-0.714*k),b[a+2]=C(d-226.816+1.772*n);return b},_convertYcckToRgb:function(b){for(var d,n,k,a,v=0,w=0,c=b.length;w<c;w+=4){d=b[w];n=b[w+1];k=b[w+2];a=b[w+3];var l=-122.67195406894+n*(-6.60635669420364E-5*n+4.37130475926232E-4*k-5.4080610064599E-5*d+4.8449797120281E-4*a-0.154362151871126)+k*(-9.57964378445773E-4*
k+8.17076911346625E-4*d-0.00477271405408747*a+1.53380253221734)+d*(9.61250184130688E-4*d-0.00266257332283933*a+0.48357088451265)+a*(-3.36197177618394E-4*a+0.484791561490776),h=107.268039397724+n*(2.19927104525741E-5*n-6.40992018297945E-4*k+6.59397001245577E-4*d+4.26105652938837E-4*a-0.176491792462875)+k*(-7.78269941513683E-4*k+0.00130872261408275*d+7.70482631801132E-4*a-0.151051492775562)+d*(0.00126935368114843*d-0.00265090189010898*a+0.25802910206845)+a*(-3.18913117588328E-4*a-0.213742400323665);
d=-20.810012546947+n*(-5.70115196973677E-4*n-2.63409051004589E-5*k+0.0020741088115012*d-0.00288260236853442*a+0.814272968359295)+k*(-1.53496057440975E-5*k-1.32689043961446E-4*d+5.60833691242812E-4*a-0.195152027534049)+d*(0.00174418132927582*d-0.00255243321439347*a+0.116935020465145)+a*(-3.43531996510555E-4*a+0.24165260232407);b[v++]=C(l);b[v++]=C(h);b[v++]=C(d)}return b},_convertYcckToCmyk:function(b){for(var d,n,k,a=0,v=b.length;a<v;a+=4)d=b[a],n=b[a+1],k=b[a+2],b[a]=C(434.456-d-1.402*k),b[a+1]=
C(119.541-d+0.344*n+0.714*k),b[a+2]=C(481.816-d-1.772*n);return b},_convertCmykToRgb:function(b){for(var d,n,k,a,v=0,w=1/255/255,c=0,l=b.length;c<l;c+=4){d=b[c];n=b[c+1];k=b[c+2];a=b[c+3];var h=d*(-4.387332384609988*d+54.48615194189176*n+18.82290502165302*k+212.25662451639585*a-72734.4411664936)+n*(1.7149763477362134*n-5.6096736904047315*k-17.873870861415444*a-1401.7366389350734)+k*(-2.5217340131683033*k-21.248923337353073*a+4465.541406466231)-a*(21.86122147463605*a+48317.86113160301),s=d*(8.841041422036149*
d+60.118027045597366*n+6.871425592049007*k+31.159100130055922*a-20220.756542821975)+n*(-15.310361306967817*n+17.575251261109482*k+131.35250912493976*a-48691.05921601825)+k*(4.444339102852739*k+9.8632861493405*a-6341.191035517494)-a*(20.737325471181034*a+47890.15695978492);d=d*(0.8842522430003296*d+8.078677503112928*n+30.89978309703729*k-0.23883238689178934*a-3616.812083916688)+n*(10.49593273432072*n+63.02378494754052*k+50.606957656360734*a-28620.90484698408)+k*(0.03296041114873217*k+115.60384449646641*
a-49363.43385999684)-a*(22.33816807309886*a+45932.16563550634);b[v++]=0<=h?255:-16581375>=h?0:255+h*w|0;b[v++]=0<=s?255:-16581375>=s?0:255+s*w|0;b[v++]=0<=d?255:-16581375>=d?0:255+d*w|0}return b},getData:function(b,d,n){if(4<this.numComponents)throw"Unsupported color mode";b=this._getLinearizedBlockData(b,d);if(3===this.numComponents)return this._convertYccToRgb(b);if(4===this.numComponents){if(this._isColorConversionNeeded())return n?this._convertYcckToRgb(b):this._convertYcckToCmyk(b);if(n)return this._convertCmykToRgb(b)}return b}};
return P}()});