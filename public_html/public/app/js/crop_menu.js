var crop_menu= '<div class="col-md-8">'+
            '<div class="img-container">'+
                '<img id="image-crop" src="" alt="Picture">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4" id="actions">'+

            '<div class="docs-toggles">'+
                '<!-- <h3 class="page-header">Toggles:</h3> -->'+
                '<div class="btn-group btn-group-justified" data-toggle="buttons">'+
                    '<label class="btn btn-primary active">'+
                        '<input type="radio" class="sr-only" id="aspectRatio0" name="aspectRatio" value="1.7777777777777777" checked>'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 16 / 9">'+
                            '16:9'+
                        '</span>'+
                    '</label>'+
                    '<label class="btn btn-primary">'+
                        '<input type="radio" class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.3333333333333333">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 4 / 3">'+
                            '4:3'+
                        '</span>'+
                    '</label>'+
                    '<label class="btn btn-primary">'+
                        '<input type="radio" class="sr-only" id="aspectRatio2" name="aspectRatio" value="1">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 1 / 1">'+
                            '1:1'+
                        '</span>'+
                    '</label>'+
                    '<label class="btn btn-primary">'+
                        '<input type="radio" class="sr-only" id="aspectRatio3" name="aspectRatio" value="0.6666666666666666">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: 2 / 3">'+
                            '2:3'+
                        '</span>'+
                    '</label>'+
                    '<label class="btn btn-primary">'+
                        '<input type="radio" class="sr-only" id="aspectRatio4" name="aspectRatio" value="NaN">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="aspectRatio: NaN">'+
                            'Free'+
                        '</span>'+
                    '</label>'+
                '</div>'+
            '</div><!-- /.docs-toggles -->'+
            '<div class="docs-buttons">'+
                '<!-- <h3 class="page-header">Toolbar:</h3> -->'+
                '<div class="btn-group">'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="setDragMode" data-option="move" title="Move">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Move cropper">'+
                            '<span class="fa fa-arrows"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="setDragMode" data-option="crop" title="Crop">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Cropper drag mode">'+
                            '<span class="fa fa-crop"></span>'+
                        '</span>'+
                    '</button>'+
                '</div>'+
                '<div class="btn-group hidden">'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="crop" title="Crop">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Cropper">'+
                            '<span class="fa fa-check"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="clear" title="Clear">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Clear cropper">'+
                            '<span class="fa fa-remove"></span>'+
                        '</span>'+
                    '</button>'+
                '</div>'+
                '<div class="btn-group">'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="zoom" data-option="0.1" title="Zoom In">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Zoom +">'+
                            '<span class="fa fa-search-plus"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="zoom" data-option="-0.1" title="Zoom Out">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Zoom -">'+
                            '<span class="fa fa-search-minus"></span>'+
                        '</span>'+
                    '</button>'+
                '</div>'+
                '<div class="btn-group">'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="move" data-option="-10" data-second-option="0" title="Move Left">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Move left">'+
                            '<span class="fa fa-arrow-left"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="move" data-option="10" data-second-option="0" title="Move Right">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Move right">'+
                            '<span class="fa fa-arrow-right"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="move" data-option="0" data-second-option="-10" title="Move Up">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Move up">'+
                            '<span class="fa fa-arrow-up"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-method="move" data-option="0" data-second-option="10" title="Move Down">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Move down">'+
                            '<span class="fa fa-arrow-down"></span>'+
                        '</span>'+
                    '</button>'+
                '</div>'+
                '<div class="btn-group hidden">'+
                    '<button type="button" class="btn btn-primary doc-button" data-flip="horizontal" data-method="scaleX" data-option="-1" title="Flip Horizontal">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Flip horizontal">'+
                            '<span class="fa fa-arrows-h"></span>'+
                        '</span>'+
                    '</button>'+
                    '<button type="button" class="btn btn-primary doc-button" data-flip="vertical" data-method="scaleY" data-option="-1" title="Flip Vertical">'+
                        '<span class="docs-tooltip" data-toggle="tooltip" title="Flip vertical">'+
                            '<span class="fa fa-arrows-v"></span>'+
                        '</span>'+
                    '</button>'+
                '</div>'+
            '</div><!-- /.docs-buttons -->'+
        '</div>';