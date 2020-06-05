@extends('welcome')

@section('content')

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">
                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">Add</button>
                        </th>
                        <!--@auth-->
                          
                        <!--@endauth-->
                    </tr>
                    </thead>
                    <tbody id="AjaxBody">

                    </tbody>
                </table>
                <div id="AjaxPaginator" style=" display: flex; list-style-type: none;align-items: center;justify-content: center;">
                    
                </div>
            </div>
        </div>
    </div>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Contact</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form action="{{ url('add') }}" method="post" enctype="multipart/form-data">
            
            <h5 style="text-align: left;">
                Name: <span id="messageName"></span>
                <input class="form-control" placeholder="Contact name" id="name" type="text" name="name" maxlength="40" minlength="2" value="">
            </h5>
            <h5 style="text-align: left;">
                Email:
                <input class="form-control" placeholder="Contact email" id="email" type="email" name="email" value="">
            </h5>
            <h5 style="text-align: left;">
                Phone:
                <input class="form-control" placeholder="Contact phone" id="phonenumber" type="text" name="phonenumber" value="">
            </h5>
            
        </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" id="btAddContact2">Add</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal Edit-->
<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Contact</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
        <form action="{{ url('add') }}" method="post" enctype="multipart/form-data">
            
            <h5 style="text-align: left;">
                Name: <span id="messageName"></span>
                <input class="form-control" placeholder="Contact name" id="name2" type="text" name="name" maxlength="40" minlength="2" value="">
            </h5>
            <h5 style="text-align: left;">
                Email:
                <input class="form-control" placeholder="Contact email" id="email2" type="email" name="email" value="">
            </h5>
            <h5 style="text-align: left;">
                Phone:
                <input class="form-control" placeholder="Contact phone" id="phonenumber2" type="text" name="phonenumber" value="">
            </h5>
            
        </form>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" id="dataid">Edit</button>
      </div>
    </div>
  </div>
</div>

@endsection