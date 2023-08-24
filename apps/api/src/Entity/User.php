<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Metadata as Api;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[UniqueEntity('email')]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\EntityListeners(['App\EntityListener\UserListener'])]
#[Api\ApiResource(
    normalizationContext:['groups' => ['read_user']],
    denormalizationContext:['groups' => ['create_user']],
    operations:[
        new Api\GetCollection(
            paginationEnabled: false,// Ceci supprime la limite d'utilisateur de 30 pour le login //
        ),
        new Api\Post(),
        new Api\Get(),
        new Api\Put(),
        new Api\Delete()
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read_user', 'read_sheet', 'read_lesson', 'read_participant', 'read_message'])]
    #[Api\ApiProperty(identifier:false)]
    private ?int $id = null;
    
    #[ORM\Column(length: 255)]
    #[Gedmo\Slug(fields:['firstname','lastname'])]
    #[Api\ApiProperty(identifier:true)]
    #[Groups(['read_sheet', 'read_lesson', 'read_user', 'read_participant', 'read_message'])]
    private ?string $slug = null;

    #[ORM\Column]
    #[Groups(['read_user', 'create_user'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Choice(
        choices: ['ROLE_ADMIN', 'ROLE_USER'],
        multiple: true,
        message: "Le rôle choisi n'existe pas.",
    )]
    private array $roles = [];

    #[ORM\Column]
    #[Groups(['read_user', 'create_user'])]
    private ?int $tokken = 3;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user','read_category','read_sheet', 'create_user', 'read_lesson', 'read_participant', 'read_message'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Regex(
        pattern: '/\d/',
        match: false,
        message: "Un Prénom ne peut contenir de chiffres."
    )]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user', 'read_sheet', 'create_user', 'read_participant', 'read_message'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Regex(
        pattern: '/\d/',
        match: false,
        message: "Un Nom ne peut contenir de chiffres."
    )]
    private ?string $lastname = null;
    
    #[Groups(['read_user', 'create_user'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Length(
        min: 8,
        minMessage: "un mot de passe éfficace doit comporter au moins 8 caractères.",
    )]
    #[Assert\Regex(
        pattern: '/^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&^*+\-=_\;:,.(){}<>]).+$/',
        match: true,
        message: "Le mot de passe doit contenir au moins une majuscule, un caractère spécial et un chiffre et ne peut contenir d'espaces.",
    )]
    private ?string $plaintextPassword = null;
   
    #[ORM\Column]
    #[Groups(['read_user', 'create_user'])]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read_user', 'create_user'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Email(message: "L'adresse email n'est pas valide.")]
    private ?string $email = null;

    #[ORM\Column(length: 12, nullable: true)]
    #[Groups(['read_user', 'create_user'])]
    #[Assert\Regex(
        pattern: '/^\+\d{11}$/',
        match: true,
        message: "Numéro de téléphone à 10 chiffres au format +33XXXXXXXXX ",
    )]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read_user','read_sheet', 'create_user'])]
    #[Assert\Regex(
        pattern: '/^(?=.*\w).+/',
        match: true,
    )]
    private ?string $city = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read_user','read_sheet', 'create_user'])]
    #[Assert\NotBlank(message: "Ce champs ne peut être vide.")]
    #[Assert\NotNull(message: "Ce champs ne peut être nul.")]
    #[Assert\Regex(
        pattern: '/^([02][1-9]|2[AB]|[1345678][0-9]|9[012345]|97[12346])$/',
        match: true,
        message: "Ce numéro ce département n'existe pas.",
    )]
    private ?int $district = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read_user', 'read_sheet', 'create_user'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Sheet::class, orphanRemoval: true)]
    private Collection $sheets;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Lesson::class, orphanRemoval: true)]
    private Collection $lessons;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Participant::class)]
    #[Groups(['read_user'])]
    private Collection $participants;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Message::class, orphanRemoval: true)]
    #[Groups(['read_user'])]
    private Collection $messages;
    
    public function __construct()
    {
        $this->sheets = new ArrayCollection();
        $this->lessons = new ArrayCollection();
        $this->participants = new ArrayCollection();
        $this->messages = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->id;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getTokken(): ?int
    {
        return $this->tokken;
    }

    public function setTokken(int $tokken): static
    {
        $this->tokken = $this->tokken + $tokken;

        return $this;
    }

    public function getPlaintextPassword(): string
    {
        return $this->plaintextPassword;
    }

    public function setPlaintextPassword($plaintextPassword): static
    {
        $this->plaintextPassword = $plaintextPassword;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getDistrict(): ?int
    {
        return $this->district;
    }

    public function setDistrict(int $district): static
    {
        $this->district = $district;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Sheet>
     */
    public function getSheets(): Collection
    {
        return $this->sheets;
    }

    public function addSheet(Sheet $sheet): static
    {
        if (!$this->sheets->contains($sheet)) {
            $this->sheets->add($sheet);
            $sheet->setUser($this);
        }

        return $this;
    }

    public function removeSheet(Sheet $sheet): static
    {
        if ($this->sheets->removeElement($sheet)) {
            // set the owning side to null (unless already changed)
            if ($sheet->getUser() === $this) {
                $sheet->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Lesson>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): static
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons->add($lesson);
            $lesson->setUser($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): static
    {
        if ($this->lessons->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getUser() === $this) {
                $lesson->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Participant>
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): static
    {
        if (!$this->participants->contains($participant)) {
            $this->participants->add($participant);
            $participant->setUser($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): static
    {
        if ($this->participants->removeElement($participant)) {
            // set the owning side to null (unless already changed)
            if ($participant->getUser() === $this) {
                $participant->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setOwner($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getOwner() === $this) {
                $message->setOwner(null);
            }
        }

        return $this;
    }
}
