<?php

namespace App\Http\Requests\faculty_portal;

use Illuminate\Foundation\Http\FormRequest;

class change_session_number_Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'registration_number' => 'required',
            'session_value' => 'required'
        ];
    }
}
