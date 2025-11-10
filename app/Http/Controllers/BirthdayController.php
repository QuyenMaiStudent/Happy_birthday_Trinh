<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BirthdayController extends Controller
{
    public function show(Request $request)
    {
        $recipient = 'Phạm Thị Tuyết Trinh';
        
        $memories = [
            [
                'title' => 'Sinh năm 2005',
                'date' => '2005',
                'description' => 'Một thiên thần nhỏ chào đời, mang theo nụ cười tươi tắn và trái tim ấm áp',
                'icon' => '👶'
            ],
            [
                'title' => 'Lần đầu gặp gỡ',
                'date' => 'Lớp 9 - 2020',
                'description' => 'Chúng ta gặp nhau lần đầu trong năm học lớp 9, bắt đầu một tình bạn đẹp đẽ',
                'icon' => '🌟'
            ],
            [
                'title' => 'Ba năm THPT cùng nhau',
                'date' => '2021 - 2024',
                'description' => 'Cùng nhau trải qua 3 năm THPT đầy kỷ niệm, chia sẻ niềm vui, nỗi buồn và những ước mơ',
                'icon' => '📚'
            ],
            [
                'title' => 'Đài Loan - Hành trình mới',
                'date' => 'Ngày 9 Tháng 2 Năm 2025',
                'description' => 'Trinh bắt đầu hành trình du học tại Đài Loan, theo đuổi ước mơ và khám phá thế giới mới',
                'icon' => '✈️'
            ],
            [
                'title' => 'Tuổi 20 - Sinh nhật đặc biệt',
                'date' => 'Tháng 11/2025',
                'description' => 'Dù xa cách, tình bạn vẫn mãi bên nhau. Chúc mừng sinh nhật tuổi 20! 🎉',
                'icon' => '🎂'
            ]
        ];

        $wishes = [
            [
                'type' => 'Học tập',
                'content' => 'Chúc bạn học giỏi, đạt được những thành tích cao trong học tập tại Đài Loan. Mỗi ngày là một bước tiến mới!',
                'icon' => '📚'
            ],
            [
                'type' => 'Sức khỏe',
                'content' => 'Chúc bạn luôn mạnh khỏe, tràn đầy năng lượng để chinh phục mọi mục tiêu. Hãy chăm sóc bản thân thật tốt nhé!',
                'icon' => '💪'
            ],
            [
                'type' => 'Hạnh phúc',
                'content' => 'Chúc bạn luôn vui vẻ, tích cực và tìm thấy niềm vui trong mọi điều nhỏ bé. Nụ cười của bạn làm thế giới này đẹp hơn!',
                'icon' => '😊'
            ],
            [
                'type' => 'Ước mơ',
                'content' => 'Chúc mọi ước mơ của bạn đều thành hiện thực. Bạn xứng đáng với tất cả những điều tốt đẹp nhất!',
                'icon' => '⭐'
            ]
        ];

        return Inertia::render('Welcome', [
            'recipient' => $recipient,
            'memories' => $memories,
            'wishes' => $wishes,
            'specialMessage' => 'Dù ở xa, tình bạn vẫn luôn ở gần. Chúc mừng sinh nhật 20 tuổi người bạn tuyệt vời! 🎉'
        ]);
    }
}
