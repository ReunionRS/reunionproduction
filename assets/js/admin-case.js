jQuery( document ).ready( function( $ ) {
    function openMediaWindow( fieldKey ) {
        var fieldWrapper = $( '.reunionproduction-media-field[data-field="' + fieldKey + '"]' );
        var targetInput = fieldWrapper.find( 'input[type="hidden"]' );
        var preview = fieldWrapper.find( '.reunionproduction-media-preview' );

        var isVideo = fieldKey === 'case_video_url';
        var title = isVideo ? 'Выберите видео' : 'Выберите изображение';
        var libraryType = isVideo ? 'video' : 'image';
        var frame = wp.media({
            title: title,
            button: {
                text: 'Выбрать',
            },
            library: {
                type: libraryType,
            },
            multiple: false,
        });

        frame.on( 'select', function() {
            var attachment = frame.state().get( 'selection' ).first().toJSON();
            var maxBytes = 3 * 1024 * 1024 * 1024;
            var fileSize = attachment.filesize || attachment.file_size || attachment.size || 0;

            if ( isVideo && fileSize > 0 && fileSize > maxBytes ) {
                alert( 'Выбранный файл слишком большой. Загрузите видео не больше 3 ГБ.' );
                return;
            }

            targetInput.val( attachment.url ).trigger( 'change' );
            if ( isVideo ) {
                preview.html( '<video controls style="max-width:100%;height:auto;border:1px solid #ddd;padding:4px;border-radius:8px;"><source src="' + attachment.url + '" type="video/mp4"></video>' );
            } else {
                preview.html( '<img src="' + attachment.url + '" style="max-width:100%;height:auto;border:1px solid #ddd;padding:4px;border-radius:8px;" />' );
            }
        });

        frame.open();
    }

    $( document ).on( 'click', '.reunionproduction-media-button', function( e ) {
        e.preventDefault();
        var target = $( this ).data( 'target' );
        openMediaWindow( target );
    });

    $( document ).on( 'click', '.reunionproduction-media-remove-button', function( e ) {
        e.preventDefault();
        var target = $( this ).data( 'target' );
        var fieldWrapper = $( '.reunionproduction-media-field[data-field="' + target + '"]' );
        fieldWrapper.find( 'input[type="hidden"]' ).val( '' );
        fieldWrapper.find( '.reunionproduction-media-preview' ).empty();
    });
});
