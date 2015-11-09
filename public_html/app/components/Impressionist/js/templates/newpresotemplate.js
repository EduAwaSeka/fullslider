var newpresotemplate = '<div id="newpreso">'+
						   '<h4 id="presotitle" class="settingsboxheader">Title</h4><input id="presotitleinput" type="text"></input>'+
						   '<h4 id="presodescription" class="settingsboxheader">Description</h4><textarea id="presotitledescription"></textarea>'+
						   '<a class="btn btn-large btn-primary btn-inline previewbtn settingsCancelBtn" id="newpresocancel">&nbsp;Cancel</a>'+
          				   '<a class="btn btn-large btn-inline btn-info previewbtn">&nbsp;OK</a>'
          				'</div>'
var slidethumb = '<div id="slidethumb_^UID^" class="slidethumb thumbelement">'+
					 '<div class="thumbnailholder"></div>'+
					 '<canvas class="slidemask" id="slidethumb_^UID^" style="z-index:1000; width:100%; height:100%; background-color:#FFF; opacity:0.1; left:0px; top:0px; position:absolute"></canvas>'+
					'<a id="deletebtn" data-parent="slidethumb_^UID^" style="z-index:1001;" class="btn btn-info btn-small deletebtn"><i class="fui-cross-16"></i></a>'+
				 '</div>';
var impress_slide = '<div class="impress-slide" id="impress_slide__slidenumber__">'+
						'<div class="slidelement editable slidelementh1" id="slidelement_id" data-button-class="text" data-parent="impress_slide__slidenumber__" data-type="h2" style="width:auto; height:60px; position:absolute; left:190px; top:50px; whitespace:no-wrap;"> <div>Sample Heading</div> </div>'+
                    	'<div class="slidelement editable slidelementh3" id="slidelement_id" data-button-class="text" data-parent="impress_slide__slidenumber__" data-type="h3" style="position:absolute; width:auto; height:40px; left:270px; top:120px; whitespace:no-wrap;"> <div>Sample Paragraph</div> </div>'+
                	'</div>';
 var text_snippet = '<div class="slidelement editable slidelementh1" id="slidelement_id" data-button-class="text" data-parent="impress_slide__slidenumber__" data-type="h2" style="width:auto; height:60px; position:absolute; left:190px; top:50px; whitespace:no-wrap;"> <div>Sample Heading</div> </div>';
 var saved_presentations = '<div class="savedpresos">' +
                                    '<div class="presothumbcontent">' +
                                        '<h3 style="display:inline-block; color:#2980B9"> __presotitle__</h3>'+
                                        '<p style="font-size: 120%">__presodescription__</p>'+
                                    '</div>'+
                                    '<div class="presothumb idle" >'+
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-info openpresobtn" style="position:absolute; right: 10px; top: 10px"><i class="fui-eye-16"></i></a>' +
                                        '<a href="#"  data-id="__presoid__" class="btn btn-inline btn-danger deletepresobtn" style="position:absolute; right: 60px; top: 10px"><i class="icon-trash"></i></a></br>'+
                                    '</div>' +
                            '</div>';
var font_size_selector = '<div class="btn-group">'+
                                '<a class="btn btn-small btn-inverse dropdown-toggle" data-toggle="dropdown" title="Choose the font size"><span class="text fontSizeReadout">72</span>' +
                                        '<span class="caret"></span></a>' +
                                '<ul class="dropdown-menu" data-option="fontSize">' +
                                        '<li>' +
                                          '<a class="is-etch-button" href="#" data-value="144">144</a>' +
                                          '<a class="is-etch-button" href="#" data-value="96">96</a>' +
                                          '<a class="is-etch-button" href="#" data-value="72">72</a>' +
                                          '<a class="is-etch-button" href="#" data-value="64">64</a>' +
                                          '<a class="is-etch-button" href="#" data-value="48">48</a>' +
                                          '<a class="is-etch-button" href="#" data-value="36">36</a>' +
                                          '<a class="is-etch-button" href="#" data-value="24">24</a>' +
                                          '<a class="is-etch-button" href="#" data-value="16">16</a>' +
                                          '<a class="is-etch-button" href="#" data-value="12">12</a>' +
                                          '<a class="is-etch-button" href="#" data-value="8">8</a>' +
                                        '</li>' +
                                '</ul>' +
                        '</div>';      

var font_family_selector =  '<div class="btn-group">'+
                                '<a class="btn btn-inverse dropdown-toggle btn-small fontFamilyBtn" data-toggle="dropdown" title="Choose the font family"><span class="text fontFamilyReadout">Lato</span><span class="caret"></span></a>'+
                                '<ul class="dropdown-menu menuBarOption" data-option="fontFamily">'+
                                        '<li>'+
                                          '<a class="abril is-etch-button" href="#" data-value="\'Abril Fatface\', cursive">Abril</a>'+
                                          '<a class="architects is-etch-button" href="#" data-value="\'Architects Daughter\', cursive">Architects Daughter</a>'+
                                          '<a class="bangers is-etch-button" href="#" data-value="\'Bangers\', cursive">Bangers</a>'+
                                          '<a class="blackops is-etch-button" href="#" data-value="\'Black Ops One\', cursive">Black Ops One</a>'+
                                          '<a class="cabin-sketch is-etch-button" href="#" data-value="\'Cabin Sketch\', cursive">Cabin Sketch</a>'+
                                          '<a class="cookie is-etch-button" href="#" data-value="\'Cookie\', cursive">Cookie</a>'+
                                          '<a class="courgette is-etch-button" href="#" data-value="\'Courgette\', cursive">Courgette</a>'+
                                          '<a class="crimson is-etch-button" href="#" data-value="\'Crimson Text\', serif">Crimson Text</a>'+
                                          '<a class="dancingscript is-etch-button" href="#" data-value="\'Dancing Scriptt\', cursive">Dancing Script</a>'+
                                          '<a class="droidsansmono is-etch-button" href="#" data-value="\'Droid Sans Mono\', monospace">Droid Sans Mono</a>'+
                                          '<a class="fredoka is-etch-button" href="#" data-value="\'Fredoka One\', cursive">Fredoka One</a>'+
                                          '<a class="gorditas is-etch-button" href="#" data-value="\'Gorditas\', cursive">Gorditas</a>'+
                                          '<a class="greatvibes is-etch-button" href="#" data-value="\'Great Vibes\', cursive">Great Vibes</a>'+
                                          '<a class="hammersmith is-etch-button" href="#" data-value="\'Hammersmith One\', sans-serif">Hammersmith One</a>'+
                                          '<a class="inconsolata is-etch-button" href="#" data-value="\'Inconsolata\',">Inconsolata</a>'+
                                          '<a class="indieflower is-etch-button" href="#" data-value="\'Indie Flower\', cursive">Indie Flower</a>'+
                                          '<a class="lato is-etch-button" href="#" data-value="\'Lato\', sans-serif">Lato</a>'+
                                          '<a class="leaguegothic is-etch-button" href="#" data-value="\'League Gothic\', sans-serif">League Gothic</a>'+
                                          '<a class="lobster is-etch-button" href="#" data-value="\'Lobster\', serif">Lobster</a>'+
                                          '<a class="miltonian is-etch-button" href="#" data-value="\'Miltonian\', cursive">Miltonian</a>'+
                                          '<a class="montserrat is-etch-button" href="#" data-value="\'Montserrat\', sans serif">Montserrat</a>'+
                                          '<a class="niconne is-etch-button" href="#" data-value="\'Niconne\', cursive">Niconne</a>'+
                                          '<a class="pacifico is-etch-button" href="#" data-value="\'Pacifico\', cursive">Pacifico</a>'+
                                          '<a class="playfair is-etch-button" href="#" data-value="\'Playfair Display\', cursive">Playfair Display</a>'+
                                          '<a class="pressstart is-etch-button" href="#" data-value="\'Press Start 2P\', cursive">Press Start 2P</a>'+
                                          '<a class="quicksand is-etch-button" href="#" data-value="\'Quicksand\', sans-serif">Quicksand</a>'+
                                          '<a class="satisfy is-etch-button" href="#" data-value="\'Satisfy\', cursive">Satisfy</a>'+
                                          '<a class="shadows is-etch-button" href="#" data-value="\'Shadows Into Light\', cursive">Shadows Into Light</a>'+
                                          '<a class="specialelite is-etch-button" href="#" data-value="\'Special Elite\', cursive">Special Elite</a>'+
                                          '<a class="tangerine is-etch-button" href="#" data-value="\'Tangerine\', cursive">Tangerine</a>'+
                                          '<a class="ubuntu is-etch-button" href="#" data-value="\'Ubuntu\', sans-serif">Ubuntu</a>'+
                                        '</li>'+
                                '</ul>'+
                            '</div>';