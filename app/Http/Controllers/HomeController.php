<?php

namespace App\Http\Controllers;

use App\Models\FacultyMember;
use App\Models\Log;
use App\Models\Section;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /* generate a home function and add comment */
    public function home()
    {
        return view('AMS.frontend.home.index');
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required',
            'phone' => 'required',
            'photo_url' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [];
        $email = Str::lower($request->email);
        $success_msg = 'The user account has been created.';

        DB::beginTransaction();

        try {
            switch ($request->role) {
                case '2':
                    $faculty = FacultyMember::create([
                        'phone' => $request->phone,
                        'department_id' => 1,
                    ]);
                    $data['faculty_id'] = $faculty->id;
                    break;

                case '4':
                    $student = Student::create([
                        'phone' => $request->phone,
                    ]);
                    $data['student_id'] = $student->id;
                    break;
            }

            $values = [
                'full_name' => $request->full_name,
                'email' => $email,
                'password' => Hash::make($request->password),
                'photo_url' => $request->photo_url,
                'role_id' => $request->role,
            ];

            if (isset($data['faculty_id'])) {
                $success_msg = 'The faculty member account has been created.';
                $values['faculty_member_id'] = $data['faculty_id'];
            }
            if (isset($data['student_id'])) {
                $success_msg = 'The student account has been created.';
                $values['student_id'] = $data['student_id'];
            }

            $user = User::create($values);
            $data['user_id'] = $user->id;

            DB::commit(); // This won't be reached due to the error
        } catch (\Exception $e) {
            // The transaction will be rolled back due to the error
            DB::rollback();
            return response()->json([
                'message' => $e,
                'data' => $data,
            ], 500);
        }

        return response()->json([
            'message' => $success_msg,
            'data' => $data,
        ], 201);
    }
    public function registrationForm()
    {
        $sections = Section::all();
        return view('AMS.frontend.register.index', compact('sections'));
    }
    public function loginForm()
    {
        return view('AMS.frontend.login.index');
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            // Check if the user is a student and has a schedule today
            if (Auth::user()->role->name === 'student') {
                $student = Student::find(Auth::user()->student_id);
                $hasScheduleCounter = 0;
                // dd($student->section->schedules);
                foreach ($student->section->schedules as $schedule) {
                    if ($schedule->checkIfStudentHasScheduleToday()) {
                        $hasScheduleCounter++;
                    }

                }
                if ($hasScheduleCounter === 0) {
                    Auth::logout();
                    return redirect()->back()->with('errorAlert', 'You have no schedule today');
                }
            }

            // Authentication was successful...
            Auth::user()->status = "online";
            Auth::user()->save();

            Log::create([
                'user_id' => Auth::id(),
                'action' => 'login',
                'time_in' => now(),
            ]);

            // Save last_activity into session
            $request->session()->regenerate();
            $request->session()->put(Auth::id() . '_last_activity', now());

            // Redirect users based on their roles
            if (Auth::user()->force_change_password) {
                return redirect()->intended(route(Auth::user()->role->name . '.change-password.index'));
            }
            switch (Auth::user()->role->name) {
                case 'admin':

                    return redirect()->intended(route('admin.dashboard.index'));
                case 'faculty':
                    return redirect()->intended(route('faculty.dashboard.index'));
                case 'student':
                    return redirect()->intended(route('student.dashboard.index'));
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
    public function logout(Request $request)
    {
        // remove last_activity from session
        $request->session()->forget(Auth::id() . "_last_activity");
        // set the user's status to offline
        Auth::user()->status = "offline";
        Auth::user()->save();
        // create a log
        $log = Log::where('user_id', Auth::id())
            ->whereNull('time_out')
            ->latest()
            ->first();

        $log->update([
            'time_out' => now(),
        ]);
        //regenerate   session
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        // logout the user
        Auth::logout();

        return redirect()->route('home.index');
    }
}