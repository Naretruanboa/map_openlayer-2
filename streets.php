<!--A Design by W3layouts
Author: W3layout
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE html>
<head>
	<title>Openlayers Web Map</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="keywords" content="openlayers" />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>


    <link rel="stylesheet" href="js/Openlayers-2.13.1/theme/default/style.css" type="text/css">
    <link rel="stylesheet" href="css/style-map.css" type="text/css">
    <script src="js/Openlayers-2.13.1/OpenLayers.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script src="js/streetsMap.js"></script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Blog Post - Start Bootstrap Template</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/blog-post.css" rel="stylesheet">

<!--	<script src="js/jquery2.0.3.min.js"></script>-->
	<style type="text/css">
        input, select, textarea {
            font: 0.9em Verdana, Arial, sans-serif;
        }
        #leftcol {
            position: absolute;
            top: 0;
            left: 1em;
            padding-top: 2em;
            width: 517px;
        }
        #map {
            /*width: 50em;*/
            height: 512px;
            border: 1px solid #ccc;
        }
        #input {
            width: 512px;
        }
        #text {
            font-size: 0.85em;
            margin: 1em 0 1em 0;
            width: 100%;
            height: 10em;
        }
        #info {
            position: relative;
            padding: 2em 0;
            /*margin-left: 540px;*/
        }
        #infotext {
            position: relative;
            padding: 2em 0;
            /*margin-left: 540px;*/
        }

        #output {
            font-size: 0.8em;
            width: 100%;
            height: 512px;
            border: 0;
        }
        p {
            margin: 0;
            padding: 0.75em 0 0.75em 0;
        } 
        .smallmap{
            margin-top:1em; 
        }
    </style>
</head>

<body>



    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#">MAP OPENLAYER2</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <!-- Post Content Column -->
            <div class="col-lg-8">

                <!-- Title -->
                <h1 class="mt-4">Map ตำบล ธรรมามูล</h1>


                <hr>

                <!-- Preview Image -->
<!--                <img class="img-fluid rounded" src="http://placehold.it/900x300" alt="">-->
                <div>
                    <table>
                        <td><div id="map" class="smallmap"></div></td>
<!--                        <td ng-app=""><div id="info">-->
<!--                            </div></td>-->
                    </table>

                </div>

                <hr>

                <hr>

                <!-- Comments Form -->
                <div class="card my-4">
                    <h5 class="card-header">รายละเอียด :</h5>
                    <div class="card-body">
                        <form>

                            <div class="form-group">
                                <textarea class="form-control" rows="3" id="infotext"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">อัพเดท</button>
                        </form>
                    </div>
                </div>

            </div>

                          <!-- Sidebar Widgets Column -->
            <div class="col-md-4">

                <!-- Search Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Search</h5>
                    <div class="card-body">
                        <div class="row">
                            <div ng-app=""></div>
                            <div id="info"></div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
        <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-5 bg-dark">
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Your Website 2017</p>
        </div>
        <!-- /.container -->
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>


	<script>
		$(document).ready(function() {
			initMap();
});

    </script>




    <!--<form action="./functions/update_damages.php" method="post" enctype="multipart/form-data">\
        <div class="form-group" >Details : <input type="text" class="form-control" name="des" value="' + feature.attributes.description + '"></div>\
        <div class="form-group">Telephone : <input type="text" class="form-control" name="tel" value="' + feature.attributes.reportBy + '"></div>\
        <div class="form-group">image_chang : <input type="file" class="form-control" name="filUpload"></div>\
        <div class="form-group">Image:<img src="images/' + feature.attributes.attach + '" width="100%"></div>\
        <div class="form-group"><input type="hidden" name="id" value="' + feature.attributes.id + '"><input type="hidden" name="image" value="' + feature.attributes.attach + '"></div>\
        <input type="submit" class="btn btn-outline-success" value="Update">\
    </form>\
    <button id="btn_d" class="btn btn-outline-danger" onclick="delete_data('+feature.attributes.id+',1)">Delete</button>-->
</body>
</html>
