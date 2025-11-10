<?php

use App\Http\Controllers\BirthdayController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BirthdayController::class, 'show'])->name('home');
