<?php

namespace App\EntityListener;

use App\Entity\Lesson;
use DateTime;

Class LessonListener
{
    public function prePersist(Lesson $lesson)
    {
        $this->bookingDateFormater($lesson);
    }

    public function preUpdate(Lesson $lesson)
    {
        $this->bookingDateFormater($lesson);
    }

    public function bookingDateFormater(Lesson $lesson)
    {
        $date = new DateTime($lesson->getBookingDateEntry());

        if ($date !== false) {
            $lesson->setBookingDate($date);
        } else {
            echo '!!! Conversion FAILLED !!! '.$lesson->getBookingDateEntry().' !!! Conversion FAILLED !!!';
        }
    }
}