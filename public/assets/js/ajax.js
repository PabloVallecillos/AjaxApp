(function () {

    /* global $ */
    
    var csrf = null;

    var genericAjax = function (url, data, type, callBack) {
        $.ajax({
            url: url,
            data: data,
            type: type,
            dataType : 'json',
        })
        .done(function( json ) {
            console.log('ajax done');
            console.log(json);
            callBack(json);
        })
        .fail(function( xhr, status, errorThrown ) {
            console.log('ajax fail');
        })
        .always(function( xhr, status ) {
            console.log('ajax always');
        });
    };
    
    var simpleAjax = function (url, callBack) {
        genericAjax(url, null, 'get', callBack);
    };

    var getPageLink = function(page) {
        return `<li class="page-item">
            <a class="page-link active-page" data-page="${page}" href="#">${page}</a>
        </li>`;
    }

    var getPaginator = function (data) {
        let previousOn = 
            `<li class="page-item"  aria-label="Â« Anterior">
                <a class="page-link active-page" href="#" data-page="${data.current_page-1}" rel="previous" aria-label="Â« Anterior">Previous</a>
            </li>`;
        let previousOff = 
            `<li class="page-item disabled" aria-disabled="true" aria-label="Â« Anterior">
                <span class="page-link" aria-hidden="true">Previous</span>
            </li>`;
        let nextOn =
            `<li class="page-item">
                <a class="page-link active-page" data-page="${data.current_page+1}" href="#" rel="next" aria-label="Siguiente Â»">Next</a>
            </li>`;
        let nextOff =
            `<li class="page-item disabled" aria-disabled="true" aria-label="Siguiente Â»">
                <span class="page-link" aria-hidden="true">Next</span>
            </li>`;
        let current = 
            `<li class="page-item active" aria-current="page">
                <span class="page-link">${data.current_page}</span>
            </li>`;
        let between =
            `<li class="page-item disabled" aria-disabled="true">
                <span class="page-link">...</span>
            </li>`;
            
        var result = '';
        if(data.current_page == 1){
            result += previousOff;
        } else {
            result += previousOn;
        }
        if(data.current_page > 2){
            result += between;
        } 
        
        for (var i = data.current_page-2; i <= data.current_page+2; i++ ){
            if( i < 1 ){
                
            } else if( i > data.last_page ){
                
            } else if( i == data.current_page ){
              result += current;
            } else{
                result += getPageLink(i);
            }
        }
        
        if(data.current_page < data.last_page-1){
            result += between;
        } 
        if(data.current_page == data.last_page){
            result += nextOff;
        } else {
            result += nextOn;
        }
        return result;
            
    }
    
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var getContactBody = function (response) {
        var ajaxdata = response.contacts.data;
        var content = '';
        for(var i = 0; i < ajaxdata.length; i++){
            content += getContactTr(ajaxdata[i], response.authenticated, response.rooturl);
        }
        return content;
    };

    // var getContactRowField = function(row, field) {
    //     var content = '';
    //     if(field !== 'id' && field !== 'deleted_at') {
    //         console.log(field);
    //         if(field === 'file') {
    //             content += '<td><img src="pokemon/image/file/' + row['file'] + '" width="60px"></td>';
    //             content += '<td><img src="pokemon/image/id/' + row['id'] + '" width="60px"></td>';
    //         } else {
    //             content += '<td>' + row[field] + '</td>';
    //         }
    //     }
    //     return content;
    // };

    var getContactTr = function(row, authenticated, rootUrl) {
        var content='';
        content += '<td>' + row.name + '</td>';
        content += '<td>' + row.email + '</td>';
        content += '<td>' + row.phonenumber + '</td>';
        content += '<td><button type="button" id="btEditContact" data-id="'+row.id+'" class="btn btn-success">Edit</button> &nbsp; <button type="button" id="btDeleteContact" data-id="'+row.id+'" class="btn btn-danger">Delete</button></td>';
        return '<tr>'+content+'</tr>';
    };
    
    var request = function(pagenumber, history = true){
        genericAjax('indexajax', { page: pagenumber }, 'get', function(param1) {
           $('#AjaxBody').empty();
           $('#AjaxPaginator').empty();
           $('#AjaxBody').append(getContactBody(param1));
           $('#AjaxPaginator').append(getPaginator(param1.contacts));
          if(history) {
              window.history.pushState({ id: pagenumber }, null, '?page=' + pagenumber);
          }
        });
    }
    
    window.onpopstate = function (e) {
        console.log(e);
        var id = e.state.id;
        request(id, false);
    };

    if($('#AjaxBody').length > 0) {
        var page = getParameterByName('page');
        if(!page) {
            page = 1;
        }
        request(page);
    }
    
    $('#AjaxPaginator').on('click', '.active-page', function(event) {
        event.preventDefault();
        console.log($(this).attr('data-page'));
        var page = $(this).attr('data-page');
        request(page);
    });
    
    $(document).delegate("#btAddContact2","click",function(e){
        
        $('#exampleModal').modal('show');
        $('#btAddContact').text("Add");
        
        var nameVal = $('#name').val();
        var emailVal = $('#email').val();
        var phoneVal = $('#phonenumber').val();
        
        genericAjax('add', { name: nameVal, email: emailVal, phonenumber: phoneVal }, 'get', function(param1) {
           
           if(param1.response) {
               $('#name, #email, #phonenumber').val('');
               $('#exampleModal').modal('hide');
               alert('The user '+ nameVal +' has been successfully added');
               
            //   request(param1['contact'].current_page);
               request(page);
           } else {
               alert('The user '+ nameVal +' has been NOT successfully added');
           }
          
        });
    });
    
    $(document).delegate("#btEditContact","click",function(e){
       
        var id = $(this).attr("data-id");
        
        genericAjax('edit/'+id, { id: id }  , 'get', function(param1) {
            
            $('#exampleModal2').modal('show');
            $('#name2').val(param1['contact'].name);
            $('#email2').val(param1['contact'].email);
            $('#phonenumber2').val(param1['contact'].phonenumber);
            $('#dataid').attr('data-id',id);
            
        });
        
     });
    
    $(document).delegate("#dataid","click",function(e){
       
        var id = $(this).attr("data-id");
        var nameVal = $('#name2').val();
        var emailVal = $('#email2').val();
        var phoneVal = $('#phonenumber2').val();
        
        genericAjax('update/'+id, { id: id, name: nameVal, email: emailVal, phonenumber: phoneVal }  , 'get', function(param1) {
            
            if(param1.contact) {
              $('#exampleModal2').modal('hide');
               alert('The user '+ nameVal +' has been successfully updated');
              request(page);
           } else {
               alert('The user '+ nameVal +' has been NOT successfully updated');
           }
            
        });
        
    });
    
        
    $(document).delegate("#btDeleteContact","click",function(e){
        
        confirm('Are you sure..?')
        var id = $(this).attr("data-id");
        
        genericAjax('delete/'+id, { id: id }  , 'get', function(param1) {
          
          if(param1.contact) {
              alert('The user has been successfully deleted');
              request(page);
          } else {
              alert('The user has been NOT successfully deleted');
          }
            
        });
        
    });

})();