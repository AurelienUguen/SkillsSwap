<?php

namespace App\DataFixtures;

use App\Entity\Lesson;
use DateTime;
use DateTimeZone;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class LessonFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {

        $less0 = new Lesson();
        $less0->setCourse($this->getReference(CourseFixtures::DEB));
        $less0->setUser($this->getReference(UserFixtures::ADMIN1));
        $less0->setDate(DateTime::createFromFormat('Y-m-d', '2023-07-30', new DateTimeZone('Europe/Paris')));
        $less0->setIrl(true);
        $less0->setVisio(false);
        $manager->persist($less0);

        $less1 = new Lesson();
        $less1->setCourse($this->getReference(CourseFixtures::DEB));
        $less1->setUser($this->getReference(UserFixtures::USER4));
        $less1->setDate(DateTime::createFromFormat('Y-m-d', '2023-07-30', new DateTimeZone('Europe/Paris')));
        $less1->setIrl(true);
        $less1->setVisio(false);
        $manager->persist($less1);

        $less2 = new Lesson();
        $less2->setCourse($this->getReference(CourseFixtures::TAILLE));
        $less2->setUser($this->getReference(UserFixtures::USER4));
        $less2->setDate(DateTime::createFromFormat('Y-m-d', '2023-08-05', new DateTimeZone('Europe/Paris')));
        $less2->setIrl(true);
        $less2->setVisio(false);
        $manager->persist($less2);

        $less3 = new Lesson();
        $less3->setCourse($this->getReference(CourseFixtures::ABC));
        $less3->setUser($this->getReference(UserFixtures::USER4));
        $less3->setDate(DateTime::createFromFormat('Y-m-d', '2023-07-26', new DateTimeZone('Europe/Paris')));
        $less3->setIrl(true);
        $less3->setVisio(false);
        $manager->persist($less3);

        $less4 = new Lesson();
        $less4->setCourse($this->getReference(CourseFixtures::ABC));
        $less4->setUser($this->getReference(UserFixtures::USER3));
        $less4->setDate(DateTime::createFromFormat('Y-m-d', '2023-08-02', new DateTimeZone('Europe/Paris')));
        $less4->setIrl(true);
        $less4->setVisio(false);
        $manager->persist($less4);

        $less5 = new Lesson();
        $less5->setCourse($this->getReference(CourseFixtures::ABC));
        $less5->setUser($this->getReference(UserFixtures::ADMIN1));
        $less5->setDate(DateTime::createFromFormat('Y-m-d', '2023-08-09', new DateTimeZone('Europe/Paris')));
        $less5->setIrl(false);
        $less5->setVisio(true);
        $manager->persist($less5);

        $less6 = new Lesson();
        $less6->setCourse($this->getReference(CourseFixtures::DIEUX));
        $less6->setUser($this->getReference(UserFixtures::USER4));
        $less6->setDate(DateTime::createFromFormat('Y-m-d', '2023-09-07', new DateTimeZone('Europe/Paris')));
        $less6->setIrl(true);
        $less6->setVisio(false);
        $manager->persist($less6);

        $less7 = new Lesson();
        $less7->setCourse($this->getReference(CourseFixtures::DIEUX));
        $less7->setUser($this->getReference(UserFixtures::USER2));
        $less7->setDate(DateTime::createFromFormat('Y-m-d', '2023-09-07', new DateTimeZone('Europe/Paris')));
        $less7->setIrl(true);
        $less7->setVisio(false);
        $manager->persist($less7);

        $less8 = new Lesson();
        $less8->setCourse($this->getReference(CourseFixtures::BLENDER));
        $less8->setUser($this->getReference(UserFixtures::USER4));
        $less8->setDate(DateTime::createFromFormat('Y-m-d', '2023-08-04', new DateTimeZone('Europe/Paris')));
        $less8->setIrl(false);
        $less8->setVisio(true);
        $manager->persist($less8);

        $less9 = new Lesson();
        $less9->setCourse($this->getReference(CourseFixtures::BLENDER));
        $less9->setUser($this->getReference(UserFixtures::USER1));
        $less9->setDate(DateTime::createFromFormat('Y-m-d', '2023-08-04', new DateTimeZone('Europe/Paris')));
        $less9->setIrl(false);
        $less9->setVisio(true);
        $manager->persist($less9);

        $manager->flush();
    }

    public function getDependencies(){
        return[
            UserFixtures::class,
            CourseFixtures::class
        ];
    }
}
