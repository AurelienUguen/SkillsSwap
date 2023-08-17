<?php

namespace App\EntityListener;

use App\Entity\Lesson;
use App\Entity\Sheet;
use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;

Class LessonListener
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function prePersist(Lesson $lesson)
    {
        $this->bookingDateFormater($lesson);
    }

    public function preUpdate(Lesson $lesson)
    {
        $this->bookingDateFormater($lesson);
    }

    public function postUpdate(Lesson $lesson)
    {
        $this->lessonDone($lesson);
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

    public function lessonDone (Lesson $lesson)
    {
        if(!$lesson->isMasterValidate()){
            echo (" [ Le Master doit Valider ] ");
            return;
        }
        if(!$lesson->isMasterValidate()){
            echo (" [ Le Padawan doit Valider ] ");
            return;
        }

        $done = $lesson->isMasterValidate() && $lesson->isMasterValidate();

        if($done === true){
            $sheet = $lesson->getSheet();
            $master = $sheet->getUser();
            $padawan = $lesson->getUser();
        }
        
        $this->tokkenTransfert($sheet, $master, $padawan);
    }

    public function tokkenTransfert (Sheet $sheet, User $master, User $padawan)
    {
        $tokenSold = $sheet->getTokenPrice();

        if($tokenSold > $padawan->getTokken()) {
            echo " [ Vous n'avez pas assez de Token pour acquérir ce savoir faire ] ";
            return;
        }

        $padawan->setPlaintextPassword("PUT");
        $padawan->setTokken(-$tokenSold);
        $this->entityManager->persist($padawan);

        $master->setPlaintextPassword("PUT");
        $master->setTokken($tokenSold);
        $this->entityManager->persist($master);
        
        $this->entityManager->flush();
    }
}