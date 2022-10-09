import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const API_KEY = "031c2f64-8f4f-4071-832a-efca359c078f";

const Map = ({ style, route, setRoute }) => {
  const html = `
    <body style="margin: 0; padding: 0">
      <div id="map" style="height: 100%; width: 100%"/>
    </body>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU" type="text/javascript"></script>
  `;

  const runFirst = `
    ymaps.modules.define('MultiRouteDetails', ['util.defineClass'], function (provide, defineClass) {
      function RouteDetails(multiRoute) {
          this.multiRoute = multiRoute;
          multiRoute.events.add("activeroutechange", this.processResult, this);
      }

      defineClass(RouteDetails, {
          processResult: function (e) {
            var route = this.multiRoute.getActiveRoute();
            window.ReactNativeWebView.postMessage(JSON.stringify({ 
              distance: route.properties.get("distance").text,
              duration: route.properties.get("duration").text
            }));
          }
      });

      provide(RouteDetails);
    });  

    function init () {
      var multiRoute = new ymaps.multiRouter.MultiRoute({
          referencePoints: [[${route.from?.latitude}, ${route.from?.longitude}], [${route.to?.latitude}, ${route.to?.longitude}]],
          params: { results: 2 }
      }, { boundsAutoApply: true });

      ymaps.modules.require(['MultiRouteDetails'], function (RouteDetails) {
        new RouteDetails(multiRoute);
      });

      var myMap = new ymaps.Map('map', {
          center: [55.750625, 37.626],
          zoom: 8,
          controls: []
      });
      
      myMap.geoObjects.add(multiRoute);
    }

    ymaps.ready(init);
    true;
  `;

  return (
    <View style={[{ height: "100%", width: "100%" }, style]} pointerEvents="none">
      {route.from && route.to && (
        <WebView
          originWhitelist={["*"]}
          source={{ html }}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            setRoute((prev) => ({ ...prev, distance: data.distance, duration: data.duration }));
          }}
          injectedJavaScript={runFirst}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Map;
