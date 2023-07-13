<?php

namespace App\Entity;

use App\Repository\LessonRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata as Api;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_lesson']],
    denormalizationContext:['groups' => ['create_lesson']],
    operations:[
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class Lesson
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'lessons')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'lessons')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?Sheet $sheet = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_lesson', 'create_lesson'])]
    private ?string $bookingDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getSheet(): ?Sheet
    {
        return $this->sheet;
    }

    public function setSheet(?Sheet $sheet): static
    {
        $this->sheet = $sheet;

        return $this;
    }

    public function getBookingDate(): ?string
    {
        return $this->bookingDate;
    }

    public function setBookingDate(?string $bookingDate): static
    {
        $this->bookingDate = $bookingDate;

        return $this;
    }
}
