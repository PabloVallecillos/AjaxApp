<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\AjaxApp;


class AjaxAppController extends Controller
{
    function indexajax()
    {
        $contacts = AjaxApp::orderBy('name', 'asc')->paginate(10);
        
        return response()->json([
            'contacts' => $contacts, 
            'authenticated' => \Auth::check(),
            'rooturl' => url('/'),
            // 'csrf' => csrf_token(),
        ]);   
    }
    
    function index()
    {
        // if($request->ajax()) {
        //     $pokemons = Pokemon::orderBy('name', 'asc')->paginate(10);
        //     return response()->json(['pokemons' => $pokemons, 'authenticated' => Auth::check()]);   
        // } else {
        //     return view('pokemonajax.index');
        // }
            return view('ajaxapp.index');
    }
    
    function add(Request $request)
    {
        $contact = new AjaxApp();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phonenumber = $request->phonenumber;
    
        $result = $contact->save();     
        
        return response()->json([
            'response' => ($result > 0), 
            // 'response' => $contact, 
            'authenticated' => \Auth::check(),
            'rooturl' => url('/'),
        ]);  
    }
    
    function edit($id)
    {
        $contact = AjaxApp::findOrFail($id);
        
        return response()->json([
            'contact' => $contact, 
            'authenticated' => \Auth::check(),
            'rooturl' => url('/'),
        ]);   
    }
    
    function update(Request $request, $id)
    {
        $contact = AjaxApp::findOrFail($id);
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phonenumber = $request->phonenumber;
        
        $result = $contact->save();   
        
        return response()->json([
            'contact' => ($result > 0), 
            'authenticated' => \Auth::check(),
            'rooturl' => url('/'),
        ]);   
    }
    
    function delete($id)
    {
        $contact = AjaxApp::findOrFail($id);
        
        $result = $contact->delete();   
        
        return response()->json([
            'contact' => ($result > 0), 
            'authenticated' => \Auth::check(),
            'rooturl' => url('/'),
        ]);   
    }
    
    
}

