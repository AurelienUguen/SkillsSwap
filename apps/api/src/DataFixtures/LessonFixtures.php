<?php

namespace App\DataFixtures;

use App\Entity\Lesson;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class LessonFixtures extends Fixture implements DependentFixtureInterface
{
    const NB_LESSON = 30;
    
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');

        $lessonAd1 = new Lesson();
        $lessonAd1->setUser($this->getReference(UserFixtures::AD));
        $lessonAd1->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd1->setBookingDateEntry("2023-01-01");
        $lessonAd1->setMasterValidate(true);
        $lessonAd1->setPadawanValidate(false);
        $manager->persist($lessonAd1);

        $lessonAd2 = new Lesson();
        $lessonAd2->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd2->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd2->setBookingDateEntry("2023-01-01");
        $lessonAd2->setMasterValidate(true);
        $lessonAd2->setPadawanValidate(false);
        $manager->persist($lessonAd2);

        $lessonAd3 = new Lesson();
        $lessonAd3->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd3->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd3->setBookingDateEntry("2024-01-01");
        $lessonAd3->setMasterValidate(true);
        $lessonAd3->setPadawanValidate(false);
        $manager->persist($lessonAd3);

        $lessonAd4 = new Lesson();
        $lessonAd4->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd4->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd4->setBookingDateEntry("2023-01-01");
        $lessonAd4->setMasterValidate(false);
        $lessonAd4->setPadawanValidate(false);
        $manager->persist($lessonAd4);

        $lessonAd5 = new Lesson();
        $lessonAd5->setUser($this->getReference(UserFixtures::ADMIN));
        $lessonAd5->setSheet($this->getReference(SheetFixtures::COPRO));
        $lessonAd5->setBookingDateEntry("2024-01-01");
        $lessonAd5->setMasterValidate(false);
        $lessonAd5->setPadawanValidate(false);
        $manager->persist($lessonAd5);

        /* 
        for ($i = 1 ; $i <= self::NB_LESSON ; $i++) {
            $lesson[$i] = new Lesson();
            $lesson[$i]->setUser($this->getReference("user".mt_rand(2,(UserFixtures::NB_USER))));
            $lesson[$i]->setSheet($this->getReference("sheet".mt_rand(1,(SheetFixtures::NB_SHEET))));
            $lesson[$i]->setBookingDateEntry(($faker->date('Y-m-d')));
            $manager->persist($lesson[$i]);
        }
        */

        
        $manager->flush();
    }

    public function getDependencies ()
    {
        return [
            UserFixtures::class,
            SheetFixtures::class,
        ];
    }
}

/*///
{
  "email": "ad@ad.com",
  "password": "Password.0"
}
///*/

/*///
{
  "user": "/api/users/ad-ad",
  "sheet": "/api/sheets/coproterie",
  "bookingDateEntry": "2023-08-19",
  "padawanValidate": true,
  "masterValidate": true
}
///*/