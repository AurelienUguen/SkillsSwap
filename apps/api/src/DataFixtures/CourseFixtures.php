<?php

namespace App\DataFixtures;

use App\Entity\Course;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CourseFixtures extends Fixture implements DependentFixtureInterface
{
    const DEB = 'DEB';
    const TAILLE = 'TAILLE';
    const ABC = 'ABC';
    const DIEUX = 'DIEUX';
    const BLENDER = 'BLENDER';

    public function load(ObjectManager $manager): void
    {
        $cou1 = new Course();
        $cou1->setUser($this->getReference(UserFixtures::USER1));
        $cou1->addLanguage($this->getReference(LanguageFixtures::FR));
        $cou1->setSubject($this->getReference(SubjectFixtures::PLOMB));
        $cou1->setTitle('Déboucher une canalisation sans produit');
        $cou1->setDescription("On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.");
        $cou1->setIrl(true);
        $cou1->setVisio(false);
        $this->addReference(self::DEB, $cou1);
        $manager->persist($cou1);

        $cou2 = new Course();
        $cou2->setUser($this->getReference(UserFixtures::USER1));
        $cou2->addLanguage($this->getReference(LanguageFixtures::FR));
        $cou2->setSubject($this->getReference(SubjectFixtures::ELAG));
        $cou2->setTitle('Tailler des maronniers');
        $cou2->setDescription("On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.");
        $cou2->setIrl(true);
        $cou2->setVisio(false);
        $this->addReference(self::TAILLE, $cou2);
        $manager->persist($cou2);

        $cou3 = new Course();
        $cou3->setUser($this->getReference(UserFixtures::USER2));
        $cou3->addLanguage($this->getReference(LanguageFixtures::FR));
        $cou3->addLanguage($this->getReference(LanguageFixtures::EN));
        $cou3->setSubject($this->getReference(SubjectFixtures::PIANO));
        $cou3->setTitle('Débuter le piano avec la méthode ABC sans solfège');
        $cou3->setDescription("On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.");
        $cou3->setIrl(true);
        $cou3->setVisio(true);
        $this->addReference(self::ABC, $cou3);
        $manager->persist($cou3);

        $cou4 = new Course();
        $cou4->setUser($this->getReference(UserFixtures::USER3));
        $cou4->addLanguage($this->getReference(LanguageFixtures::FR));
        $cou4->addLanguage($this->getReference(LanguageFixtures::DE));
        $cou4->setSubject($this->getReference(SubjectFixtures::POTE));
        $cou4->setTitle('Je ferais de vous un dieux de la matière');
        $cou4->setDescription("On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.");
        $cou4->setIrl(true);
        $cou4->setVisio(false);
        $this->addReference(self::DIEUX, $cou4);
        $manager->persist($cou4);

        $cou5 = new Course();
        $cou5->setUser($this->getReference(UserFixtures::ADMIN1));
        $cou5->addLanguage($this->getReference(LanguageFixtures::FR));
        $cou5->addLanguage($this->getReference(LanguageFixtures::EN));
        $cou5->addLanguage($this->getReference(LanguageFixtures::DE));
        $cou5->setSubject($this->getReference(SubjectFixtures::INFO));
        $cou5->setTitle('Vos premiers pas avec Blender');
        $cou5->setDescription("On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.");
        $cou5->setIrl(false);
        $cou5->setVisio(true);
        $this->addReference(self::BLENDER, $cou5);
        $manager->persist($cou5);

        $manager->flush();
    }

    public function getDependencies(){
        return[
            UserFixtures::class,
            LanguageFixtures::class,
            SubjectFixtures::class
        ];
    }
}
