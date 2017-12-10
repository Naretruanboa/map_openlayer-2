OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        );
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.trigger
            }, this.handlerOptions
        );
    },

    trigger: function(e) {
        var lonlat = map.getLonLatFromPixel(e.xy);
        alert("You clicked near " + lonlat.lat + " N, " + + lonlat.lon + " E");
    }

});

var map;

var map, vectors, formats;
function updateFormats() {
    var in_options = {
        'internalProjection': map.baseLayer.projection,
        'externalProjection': new OpenLayers.Projection('EPSG:4326')
    };
    var out_options = {
        'internalProjection': map.baseLayer.projection,
        'externalProjection': new OpenLayers.Projection('EPSG:4326')
    };
    var gmlOptions = {
        featureType: "feature",
        featureNS: "http://example.com/feature"
    };
    var gmlOptionsIn = OpenLayers.Util.extend(
        OpenLayers.Util.extend({}, gmlOptions),
        in_options
    );
    var gmlOptionsOut = OpenLayers.Util.extend(
        OpenLayers.Util.extend({}, gmlOptions),
        out_options
    );
    var kmlOptionsIn = OpenLayers.Util.extend(
        {extractStyles: true}, in_options);
    formats = {
        'in': {
            wkt: new OpenLayers.Format.WKT(in_options),
            geojson: new OpenLayers.Format.GeoJSON(in_options),
            georss: new OpenLayers.Format.GeoRSS(in_options),
            gml2: new OpenLayers.Format.GML.v2(gmlOptionsIn),
            gml3: new OpenLayers.Format.GML.v3(gmlOptionsIn),
            kml: new OpenLayers.Format.KML(kmlOptionsIn),
            atom: new OpenLayers.Format.Atom(in_options),
            gpx: new OpenLayers.Format.GPX(in_options),
            encoded_polyline: new OpenLayers.Format.EncodedPolyline(in_options)
        },
        'out': {
            wkt: new OpenLayers.Format.WKT(out_options),
            geojson: new OpenLayers.Format.GeoJSON(out_options),
            georss: new OpenLayers.Format.GeoRSS(out_options),
            gml2: new OpenLayers.Format.GML.v2(gmlOptionsOut),
            gml3: new OpenLayers.Format.GML.v3(gmlOptionsOut),
            kml: new OpenLayers.Format.KML(out_options),
            atom: new OpenLayers.Format.Atom(out_options),
            gpx: new OpenLayers.Format.GPX(out_options),
            encoded_polyline: new OpenLayers.Format.EncodedPolyline(out_options)
        }
    };
}

// function initMap(){
//
//     // Google uses EPSG:900913 but out data are in EPSG:4326
//     var options = {
//         projection: new OpenLayers.Projection("EPSG:900913"),
//         displayProjection: new OpenLayers.Projection("EPSG:4326")
//     };
//
//     map = new OpenLayers.Map('map', options);
//
// var gmap = 	new OpenLayers.Layer.Google(
// 				"Google Streets", // the default
// 				{type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 20}
// 			);
// var gsat = 	new OpenLayers.Layer.Google(
// 				"Google Satellite",
// 				{type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20}
// 			);
// var ghyb =	new OpenLayers.Layer.Google(
// 				"Google Hybrid",
// 				{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
// 			);
// var gphy = 	new OpenLayers.Layer.Google(
// 				"Google Physical",
// 				{type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 20}
// 			);
//     map.addLayers([gmap, gphy, ghyb, gsat]);
// map.setBaseLayer(gsat);

// new funtion initMap openlayel 2
function initMap(){
    map = new OpenLayers.Map('map',{
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    });
    var wms = new OpenLayers.Layer.WMS( "OpenLayers WMS",
        "http://vmap0.tiles.osgeo.org/wms/vmap0?", {layers: 'basic'});
    var saveStrategy = new OpenLayers.Strategy.Save();

    vectors = new OpenLayers.Layer.Vector("Vector Layer");
    var gmap = 	new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {type: google.maps.MapTypeId.ROADMAP, numZoomLevels: 20}
    );
    var gsat = 	new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20}
    );
    var ghyb =	new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    );
    var gphy = 	new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 20}
    );

    map.addLayers([gphy,gmap,gsat,ghyb]);
    map.setBaseLayer(gsat);

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl(new OpenLayers.Control.MousePosition());
    map.addControl(new OpenLayers.Control.EditingToolbar(vectors));

    console.log(vectors);
    map.setCenter(new OpenLayers.LonLat(0,0).transform(new OpenLayers.Projection("EPSG:4326")), 3);

    // --------streets--------

    //describe visual effects when features are displayed
    streetStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "yellow",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "orange",
            fillOpacity: 0.1,
            pointRadius: 6,
        }),
        "select": new OpenLayers.Style({
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "red",
            fillOpacity: 0.3,
            pointRadius: 6,
        })
    });


    // Make a fresh vector layer, pulling features from our script URL
    streets = new OpenLayers.Layer.Vector("Streets", {
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "functions/getStreets.php",
            format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: streetStyles
    });

    // --------damages--------

    drawStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "blue",
            strokeOpacity: 1,
            strokeWidth: 2,
            fillColor: "orange",
            fillOpacity: 0.1,
            pointRadius: 6,
        }),
        "select": new OpenLayers.Style({
            strokeColor: "orange",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "orange",
            fillOpacity: 0.3,
            pointRadius: 6,
        })
    });

    damages = new OpenLayers.Layer.Vector("Damages", {
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "functions/getDamages.php",
            format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: drawStyles
    });

    // --------villages--------
    vilStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "green",
            strokeOpacity: 1,
            strokeWidth: 2,
            fillColor: "green",
            fillOpacity: 0.3,
            pointRadius: 6,
        }),
        "select": new OpenLayers.Style({
            strokeColor: "orange",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "orange",
            fillOpacity: 0.5,
            pointRadius: 6,
        })
    });

    villages = new OpenLayers.Layer.Vector("Villages", {
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "functions/getVillages.php",
            format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: vilStyles
    });

    // --------Tambon--------

    tambonStyles = new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "#996633",
            strokeOpacity: 1,
            strokeWidth: 2,
            fillColor: "#996633",
            fillOpacity: 0.1,
            pointRadius: 6,
        }),
        "select": new OpenLayers.Style({
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWidth: 4,
            fillColor: "#996633",
            fillOpacity: 0.3,
            pointRadius: 6,
        })
    });

    tambons = new OpenLayers.Layer.Vector("Tambons", {
        projection: map.displayProjection,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
            url: "functions/getTambon.php",
            format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: tambonStyles
    });



    map.addLayers([ tambons, streets, villages, damages, vectors ]);

    select = new OpenLayers.Control.SelectFeature([streets, damages, villages, tambons, vectors]);

    damages.events.on({
        "featureselected": onDamageSelect,
        "featureunselected": onDamageUnselect
    });

    villages.events.on({
        "featureselected": onVillageSelect,
        "featureunselected": onVillageUnselect
    });

    tambons.events.on({
        "featureselected": onTombonSelect,
        "featureunselected": onTombonUnselect
    });
    streets.events.on({
        "featureselected": onStreetSelect,
        "featureunselected": onStreetUnselect
    });
    vectors.events.on({
        "featureselected": serialize,
        "featureunselected": onStreetUnselect
    });


    map.addControl(select);
    select.activate();

    // map.addControl(new OpenLayers.Control.LayerSwitcher());
    // map.addControl(new OpenLayers.Control.MousePosition());

    map.zoomToExtent(
        new OpenLayers.Bounds(
            100.12438, 15.24142, 100.14661, 15.29320
        ).transform(map.displayProjection, map.projection)
    );

    updateFormats();
}

//details to be shown in map-info <div>
function onStreetSelect(event) {
    var feature = event.feature;

    // feature.attributes are fields selected in getVillages.php
    $('#info').append('<form action="./functions/update_street.php" method="post">\
            	<div class="form-group "> Name : <input type="text" name="name" value="' + feature.attributes.name + '"></div>\
            	<div class="form-group" >Description : <input type="text" name="des" value="'+feature.attributes.description+'"></div>\
            	<div class="form-group" >Type : <select name="type" id="type"></div>\
								  <option  value="1">แอสฟัลท์</option>\
								  <option  value="2">คอนกรีต</option>\
								  <option  value="3">ลูกรัง</option>\
								</select></p>\
								<input type="hidden" name="id" value="'+feature.attributes.id+'">\
								<input type="submit" class="btn btn-outline-success" value="Update">\
					            <button id="btn_d" class="btn btn-outline-danger" onclick="delete_data(\'+feature.attributes.id+\',2)"">Delete</button>\
					</form>');
    $('#infotext').append('<p>' + feature.attributes.desStreet + '</p>');

    document.getElementById("type").value=feature.attributes.type;
}

function onStreetUnselect(event) {
    var feature = event.feature;

    $('#info').html('');
    $('#infotext').html('');
}


function onDamageSelect(event) {
    var feature = event.feature;
    // feature.attributes are fields selected in getDamages.php
    $('#info').append('<form action="./functions/update_damages.php" method="post" enctype="multipart/form-data">\
        <div class="form-group" >Details : <input type="text" class="form-control" name="des" value="' + feature.attributes.description + '"></div>\
        <div class="form-group">Telephone : <input type="text" class="form-control" name="tel" value="' + feature.attributes.reportBy + '"></div>\
        <div class="form-group">Image:<img src="images/' + feature.attributes.attach + '" width="100%"></div>\
        <div class="form-group"><input  type="file" name="filUpload"></div>\
        <div class="form-group"><input type="hidden" name="id" value="' + feature.attributes.id + '"><input type="hidden" name="image" value="' + feature.attributes.attach + '"></div>\
        <input type="submit" class="btn btn-outline-success" value="Update">\
        <button id="btn_d" class="btn btn-outline-danger" onclick="delete_data(\'+feature.attributes.id+\',1)">Delete</button>\
    </form>');

        $('#infotext').append('<p>' + feature.attributes.desDam + '</p>');
}

function onDamageUnselect(event) {
    var feature = event.feature;

    $('#info').html('');
    $('#infotext').html('');
}

function onVillageSelect(event) {
    var feature = event.feature;
    $('#info').append('<form action="./functions/update_village.php" method="post" >\
                               <div class="form-group">Name:<input type="text" class="form-control" name="name" value="' + feature.attributes.name + '"></div>\
                               <div class="form-group">Type : <select class="form-control" name="type" id="type">\
                                  <option  value="1">แอสฟัลท์</option>\
                                  <option  value="2">คอนกรีต</option>\
                                  <option  value="3">ลูกรัง</option>\
                                </select></div>\
                               <div class="form-group">Image:<img src="images/' + feature.attributes.img_vi + '" width="100%"></div>\
                               <div class="form-group"><input type="file" name="filUpload"></div>\
                                <input type="hidden" name="id" value='+feature.attributes.id+'>\
                                <input type="submit" class="btn btn-outline-success" value="update">\
                                <button id="btn_d" class="btn btn-outline-danger" onclick="delete_data(\'+feature.attributes.id+\',3)">Delete</button>\
                                </form>');
    $('#infotext').append('<p>' + feature.attributes.desVill + '</p>');
    document.getElementById("type").value=feature.attributes.type;
}

function onVillageUnselect(event) {
    var feature = event.feature;

    $('#info').html('');
    $('#infotext').html('');
}




function onTombonSelect(event) {
    var feature = event.feature;

    // feature.attributes are fields selected in getVillages.php
    $('#info').append('<p>Name:' + feature.attributes.name_tambun + '</p>');
    $('#info').append('<p>จำนวน:' + feature.attributes.villagegroup + '</p>');
    $('#infotext').append('<p>' + feature.attributes.desTam + '</p>');
}

function onTombonUnselect(event) {
    var feature = event.feature;

    $('#info').html('');
    $('#infotext').html('');
}


function serialize(event) {
    var feature = event.feature;
    var type = 'geojson';
    // second argument for pretty printing (geojson only)

    var pretty = false;
    var str = formats['out'][type].write(feature, pretty);
    // not a good idea in general, just for this demo
    str = str.replace(/,/g, ', ');
    str1 = JSON.parse(str);
    if(str1.geometry.type=='Point'){
        var input = "<form action='./functions/insert_damages.php' method='post' enctype='multipart/form-data'>\
            	Telephone : <input type='text' name='tel' value='-'><br>\
            	Details : <input type='text' name='des' value='-'><br>\
            	Picture : <input type='file' name='filUpload'><br>\
            	Data : <textarea name='coord'>"+str1.geometry.type+'('+str1.geometry.coordinates[0]+" "+str1.geometry.coordinates[1]+')'+"</textarea>\
            	<input type='submit' value='add'>\
            	</form>";
        document.getElementById('infotext').value = str;
        document.getElementById('info').innerHTML = input;
        console.log(str1.geometry.type+'('+str1.geometry.coordinates[0]+" "+str1.geometry.coordinates[1]+')');
    }else if(str1.geometry.type=='LineString'){
        var x=[];
        for(let i =0;i<=str1.geometry.coordinates.length;i++){
            if(i==str1.geometry.coordinates.length){
                break;
            }
            x.push(str1.geometry.coordinates[i][0]+' '+str1.geometry.coordinates[i][1]);

        }
        var input = "<form action='./functions/insert_street.php' method='post' enctype='multipart/form-data'>\
            	Name : <input type='text' name='name' value='-'><br>\
            	Details : <input type='text' name='des' value='-'><br>\
            	Data : <textarea name='coord'>"+str1.geometry.type+'('+x+')'+"</textarea><br>\
            	Type : <select name='type'>\
						  <option value='1'>แอสฟัลท์</option>\
						  <option value='2'>คอนกรีต</option>\
						  <option value='3'>ลูกรัง</option>\
						</select>\
            	<input type='submit' value='add'>\
            	</form>";
        document.getElementById('infotext').value = str;
        document.getElementById('info').innerHTML = input;
        console.log(str1.geometry.type+'('+x+')');
    }else if(str1.geometry.type=='Polygon'){
        var x=[];
        for(let i =0;i<=str1.geometry.coordinates[0].length;i++){
            if(i==str1.geometry.coordinates[0].length){
                break;
            }
            x.push(str1.geometry.coordinates[0][i][0]+' '+str1.geometry.coordinates[0][i][1]);

        }
        var input = "<form action='./functions/insert_villages.php' method='post' enctype='multipart/form-data'>\
            	Name : <input type='text' name='name' value='-'><br>\
            	Data : <textarea name='coord'>"+str1.geometry.type+'('+x+')'+"</textarea><br>\
            	Type : <select name='type'>\
						  <option value='1'>แอสฟัลท์</option>\
						  <option value='2'>คอนกรีต</option>\
						  <option value='3'>ลูกรัง</option>\
						</select>\
            	<input type='submit' value='add'>\
            	</form>";
        document.getElementById('info').innerHTML = input;
        document.getElementById('infotext').value = str;
        console.log(str1.geometry.type+'('+x+')');
    }




    document.getElementById('infotext').value = str;
    document.getElementById('info').value = str;
}
(function() {
    var roots = ["draw_point", "draw_line", "draw_polygon", "pan"];
    var onImages = [];
    var offImages = [];
    for(var i=0; i<roots.length; ++i) {
        onImages[i] = new Image();
        onImages[i].src = "../theme/default/img/" + roots[i] + "_on.png";
        offImages[i] = new Image();
        offImages[i].src = "../theme/default/img/" + roots[i] + "_on.png";
    }
})();

function delete_data(id,tb){
    console.log(id,tb);
    $("#btn_d").click(function(){
        $.post("functions/deleteDamages.php",
            {
                id: id,
                tb: tb,
            },
            function(data,status){
                alert("Data: " + data + "\nStatus: " + status);
            });
    });
}

