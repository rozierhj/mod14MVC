const postButton = document.getElementById('make-post');
const savePostButton = document.getElementById('save-post');

postButton.addEventListener('click', () => {

    const theModal = new bootstrap.Modal(document.getElementById('postModal'), {});
    theModal.show();

});

savePostButton.addEventListener('click',()=>{

    const modalToDelete = document.getElementById('postModal');
    const blogText = document.getElementById('blog-text');
    const blogTitle = document.getElementById('blog-title');
    console.log(blogText.value);
    console.log(blogTitle.value);


    const openModal = bootstrap.Modal.getInstance(document.getElementById('postModal'));

    openModal.hide();
    openModal.dispose();

    modalToDelete.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    modalToDelete.querySelectorAll('textarea').forEach(textarea => textarea.value = '');

});