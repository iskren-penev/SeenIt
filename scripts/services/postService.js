let postService = (()=>{
    function loadPosts(username){
        if(username !== undefined && username !==null){
            return requestService.get('appdata', `posts?query={"author":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey')
        }
        return requestService.get('appdata','posts?query={}&sort={"_kmd.ect": -1}', 'kinvey')
    }

    function getPost(id){
        return requestService.get('appdata',`posts/${id}`, 'kinvey')
        
    }
    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));       
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }
    
    function createPost(url, title, author, imageUrl, description){
        let postData = {
            url, title, author, imageUrl, description
        }
        return requestService.post('appdata', 'posts', 'kinvey', postData)
    }

    function editPost(id, url, title, author, imageUrl, description){
        let postData = {
            url, title, author, imageUrl, description
        }
        return requestService.update('appdata', `posts/${id}`, 'kinvey', postData)
    }

    function deletePost(id){
        return requestService.remove('appdata', `posts/${id}`, 'kinvey')
    }

    function loadComments(id){
        return requestService.get('appdata', `comments?query={"postId":"${id}"}`, 'kinvey')
    }

    function addComment(postId, content, author){
        let commentData = {
            postId, content, author
        }
        return requestService.post('appdata', 'comments', 'kinvey', commentData)
    }

    function deleteComment(id){
        return requestService.remove('appdata', `comments/${id}`, 'kinvey')
    }

    return {
        loadPosts,
        calcTime,
        createPost,
        getPost,
        editPost,
        deletePost,
        loadComments,
        addComment,
        deleteComment
    }
})();

