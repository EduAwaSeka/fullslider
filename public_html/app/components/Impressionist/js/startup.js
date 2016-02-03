
$(document).ready(function(e)
{
    impressionist();
});
function impressionist()
{
    impressionist = new Impressionist();
    impressionist.initialize();
    impressionist.addSettingsPanel(" ");
    initializeUndoRedo();
}
